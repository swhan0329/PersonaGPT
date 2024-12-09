import AWS from "aws-sdk"; // CommonJS 모듈을 ES Module 환경에서 사용하는 방법

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "ExploreMyselfUsage";

export const handler = async (event) => {
  try {
    const { location, region, answers } = JSON.parse(event.body);

    // 데이터 저장
    const timestamp = new Date().toISOString();
    const id = `${Date.now()}`;
    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: {
        id,
        location,
        region,
        answers,
        timestamp,
      },
    }).promise();

    // 결과 생성
    const results = [
      "창의적이고 열정적인 사람입니다.",
      "끈기 있고 책임감 있는 사람입니다.",
      "협력적이며 성실한 사람입니다.",
    ];
    const randomResult = results[Math.floor(Math.random() * results.length)];

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: randomResult,
        explanation: "당신의 선택이 이러한 성향을 보여줍니다.",
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
