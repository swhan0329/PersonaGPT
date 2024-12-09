import OpenAI from "openai";

export const handler = async (event) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const body = event.body ? JSON.parse(event.body) : {};
    const { language, userAnswers } = body;

    if (!language || !userAnswers || !userAnswers.strengths || !userAnswers.weaknesses || !userAnswers.challenges || !userAnswers.solutions) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request body. Ensure 'language' and 'userAnswers' fields are properly defined." }),
        };
    }

    const promptKO = `
        당신은 전문적인 글쓰기 및 브랜딩 코치입니다. 사용자의 정보를 바탕으로 사용자를 가장 잘 표현하는 강렬한 한 문장을 만들어 주세요.
        이 문장은 사용자의 강점, 약점, 마주한 문제들, 그리고 그 문제를 해결한 방법을 기반으로 창의적이고 독창적으로 작성되어야 합니다.
        문장은 반드시 평서문으로 끝나야 합니다.

        참고 정보는 다음과 같습니다:
        - 강점: ${userAnswers.strengths.join(', ')}
        - 약점: ${userAnswers.weaknesses.join(', ')}
        - 마주한 문제들: ${userAnswers.challenges.join(', ')}
        - 그 문제를 해결한 방법: ${userAnswers.solutions.join(', ')}

        추가적으로, 아래 두 가지 제안을 작성해주세요:
        1. 강점을 더 강력하게 만들 수 있는 구체적인 방법
        2. 약점을 보완할 수 있는 구체적인 역량 개발 로드맵

        모든 응답은 친근하면서도 전문가적인 톤으로 작성되어야 하며, 잘리지 않도록 간결하고 명확하게 작성해주세요.
    `;

    const promptEN = `
        You are a professional writing and branding coach. Based on the user's information, craft a single, compelling sentence that best represents them. 
        The sentence must creatively and uniquely highlight their strengths, weaknesses, challenges, and solutions, and it should end with a declarative statement.

        Reference information:
        - Strengths: ${userAnswers.strengths.join(', ')}
        - Weaknesses: ${userAnswers.weaknesses.join(', ')}
        - Challenges faced: ${userAnswers.challenges.join(', ')}
        - Solutions implemented: ${userAnswers.solutions.join(', ')}

        Additionally, provide the following two suggestions:
        1. Specific methods to further amplify their strengths
        2. A detailed skills development roadmap to address their weaknesses

        Ensure all responses are written in a friendly yet professional tone, and avoid truncation by keeping the content concise and clear.
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: language === 'ko'
                        ? "당신은 사용자의 강점과 약점을 바탕으로 강렬하고 독창적인 개인 브랜드 문장과 실질적인 개발 로드맵을 제공하는 전문가입니다."
                        : "You are an expert in crafting unique personal branding statements and practical development roadmaps based on the user's strengths and weaknesses."
                },
                {
                    role: "user",
                    content: language === 'ko' ? promptKO : promptEN
                }
            ],
            temperature: 0.8,
            max_tokens: 500,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                representation: completion.choices[0].message.content
            }),
        };
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to get a response from OpenAI API',
                details: error.message
            }),
        };
    }
};
