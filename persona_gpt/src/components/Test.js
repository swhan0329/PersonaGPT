import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Stack,
    Container,
    Grid,
    CircularProgress, Dialog
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { useTheme } from '../contexts/ThemeContext';
import { API_URL, OPENAI_API_URL } from '../config';

const Test = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { fontSize } = useTheme();
    const resultRef = useRef(null);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState(Array(4).fill([]));
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);

    const questions = [
        {
            question: t("test.question_1"),
            options: [
                "warm", "kind", "cooperative", "creative", "passionate",
                "humorous", "responsible", "leadership", "persistent", "detailed",
                "curious", "considerate", "original", "positive", "delicate",
                "empathetic", "bold", "logical", "optimistic", "challenging"
            ].map(key => ({
                id: key,
                text: t(`test.options.strengths.${key}`)
            }))
        },
        {
            question: t("test.question_2"),
            options: [
                "slow", "passive", "perfectionist", "stubborn", "unstable",
                "rash", "careless", "authoritative", "picky", "sensitive",
                "indifferent", "distracted", "hasty", "unplanned", "defensive",
                "overcautious", "cynical", "critical", "uncooperative", "lazy"
            ].map(key => ({
                id: key,
                text: t(`test.options.weaknesses.${key}`)
            }))
        },
        {
            question: t("test.question_3"),
            options: [
                "adaptation", "relationships", "time_pressure", "stress", "goal_failure",
                "decision_making", "communication", "motivation", "self_esteem", "workload",
                "health", "learning", "teamwork", "financial", "fear_of_change",
                "recovery", "loneliness", "fear_of_failure", "anger_management", "concentration"
            ].map(key => ({
                id: key,
                text: t(`test.options.challenges.${key}`)
            }))
        },
        {
            question: t("test.question_4"),
            options: [
                "planning", "communication", "seeking_help", "new_approach", "persistence",
                "rest", "learning", "environment_change", "self_reflection", "organization",
                "mentoring", "teamwork", "meditation", "realistic_goals", "feedback",
                "accepting_failure", "hobby", "exercise", "skill_learning", "emotion_control"
            ].map(key => ({
                id: key,
                text: t(`test.options.solutions.${key}`)
            }))
        }
    ];

    const handleOptionClick = (optionId) => {
        const currentAnswers = [...answers[step]];
        const index = currentAnswers.indexOf(optionId);

        if (index === -1 && currentAnswers.length < 5) {
            setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[step] = [...currentAnswers, optionId];
                return newAnswers;
            });
        } else if (index !== -1) {
            setAnswers(prev => {
                const newAnswers = [...prev];
                newAnswers[step] = currentAnswers.filter(id => id !== optionId);
                return newAnswers;
            });
        }
    };

    const isOptionSelected = (option) => {
        return answers[step]?.includes(option.id);
    };

    const handleNext = () => {
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (step === 0) {
            navigate('/');
        } else {
            setStep(prev => prev - 1);
        }
    };

    const captureAndSave = async () => {
        try {
            setIsCapturing(true); // 캡처 시작 시 로딩 표시
            console.log("Capturing started...");

            const element = resultRef.current;
            if (!element) {
                console.error("Result element not found");
                return;
            }

            // 다운로드 버튼 숨기기
            const downloadButton = element.querySelector('[data-download-button]');
            if (downloadButton) {
                downloadButton.style.display = 'none';
            }

            const canvas = await html2canvas(element, {
                useCORS: true,
                allowTaint: true,
                scrollY: -window.scrollY,
                scale: 2, // 이미지 품질 향상
            });

            // 다운로드 버튼 다시 보이기
            if (downloadButton) {
                downloadButton.style.display = '';
            }

            // Canvas를 Blob으로 변환
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

            // Safari 체크
            const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

            if (isSafari && navigator.share) {
                // Safari에서는 공유 기능 사용
                const file = new File([blob], 'explore-myself-result.png', { type: 'image/png' });
                try {
                    await navigator.share({
                        files: [file],
                        title: t("test.result_title"),
                    });
                } catch (error) {
                    console.error('Sharing failed:', error);
                    fallbackDownload(canvas);
                }
            } else {
                // 다른 브라우저에서는 직접 다운로드
                fallbackDownload(canvas);
            }
        } catch (error) {
            console.error('Error during capture:', error);
            alert(t("test.capture_error"));
        } finally {
            setIsCapturing(false); // 작업 완료 시 로딩 숨김
        }
    };

    // 기본 다운로드 방식
    const fallbackDownload = (canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'explore-myself-result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isCapturing) {
        return (
            <Dialog
                open={isCapturing}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'hidden'
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <CircularProgress size={40} />
                    <Typography
                        sx={{
                            mt: 2,
                            color: 'text.secondary',
                            fontSize: fontSize,
                            textAlign: 'center'
                        }}
                    >
                        {t("test.preparing_image")}
                    </Typography>
                </Box>
            </Dialog>
        )
    }

    const submitAnswers = async () => {
        try {
            setIsLoading(true);

            const userAnswers = {
                strengths: answers[0].map(id => questions[0].options.find(opt => opt.id === id)?.text),
                weaknesses: answers[1].map(id => questions[1].options.find(opt => opt.id === id)?.text),
                challenges: answers[2].map(id => questions[2].options.find(opt => opt.id === id)?.text),
                solutions: answers[3].map(id => questions[3].options.find(opt => opt.id === id)?.text)
            };

            // 기존 서버 API 호출
            const serverResponsePromise = axios.post(`${API_URL}/submit`, {
                answers: answers
            });

            // Lambda (AWS API Gateway) 호출
            const openAiResponsePromise = axios.post(
                `${OPENAI_API_URL}/openai`,
                {
                    language: i18n.language,
                    userAnswers
                }
            );

            // 두 API 응답을 병렬로 기다림
            const [serverResponse, openAiResponse] = await Promise.all([serverResponsePromise, openAiResponsePromise]);

            // 응답 구조 확인을 위한 로그
            console.log('OpenAI Response:', openAiResponse.data);

            // 응답 구조에 맞게 수정
            setResult({
                serverMessage: serverResponse.data?.message,
                gptAnalysis: openAiResponse.data?.representation || openAiResponse.data // representation 필드가 있으면 사용, 없으면 전체 데이터 사용
            });
        } catch (error) {
            console.error('Error submitting answers:', error);
            alert(t("test.submit_error"));
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Container
                maxWidth="lg"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3
                }}
            >
                <CircularProgress size={60} />
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: fontSize,
                        textAlign: 'center',
                        color: 'text.secondary'
                    }}
                >
                    {t("test.analyzing_results")}
                </Typography>
            </Container>
        );
    }

    if (result) {
        return (
            <Container maxWidth="lg" sx={{ px: 2 }}>
                <Box
                    ref={resultRef}
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        py: 6,
                        px: 4,
                        gap: 4,
                        bgcolor: 'background.paper',
                        maxWidth: 800,
                        mx: 'auto'
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h1"
                        align="center"
                        sx={{
                            fontSize: {
                                xs: `${fontSize + 4}px`,
                                sm: `${fontSize + 6}px`,
                                md: `${fontSize + 8}px`
                            },
                            mb: 3,
                            fontWeight: 'bold'
                        }}
                    >
                        {t("test.result_title")}
                    </Typography>

                    {result.gptAnalysis && (
                        <Box sx={{ px: { xs: 2, sm: 4 } }}>
                            {result.gptAnalysis.split('\n').map((line, index) => {
                                // 제목 (###으로 시작하는 라인)
                                if (line.startsWith('###')) {
                                    return (
                                        <Typography
                                            key={index}
                                            variant="h6"
                                            sx={{
                                                fontSize: fontSize + 2,
                                                fontWeight: 'bold',
                                                mt: 4,
                                                mb: 2,
                                                color: 'primary.main'
                                            }}
                                        >
                                            {line.replace('###', '').trim()}
                                        </Typography>
                                    );
                                }
                                else if (line.trim()) {
                                    // ** 로 감싸진 텍스트를 <strong> 태그로 변환
                                    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                                    return (
                                        <Typography
                                            key={index}
                                            variant="body1"
                                            sx={{
                                                fontSize: fontSize,
                                                lineHeight: 1.8,
                                                my: 1,
                                                ml: line.startsWith('-') ? 2 : 0,
                                                '& strong': {
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{ __html: formattedLine }}
                                        />
                                    );
                                }
                                // <strong> 태그가 포함된 라인
                                else if (line.includes('<strong>')) {
                                    return (
                                        <Typography
                                            key={index}
                                            variant="body1"
                                            sx={{
                                                fontSize: fontSize,
                                                lineHeight: 1.8,
                                                my: 1,
                                                '& strong': {
                                                    fontWeight: 'bold',
                                                    color: 'black'
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{ __html: line }}
                                        />
                                    );
                                }
                                // 리스트 아이템 (숫자나 -로 시작하는 라인)
                                else if (line.match(/^\d+\.|^-/)) {
                                    return (
                                        <Typography
                                            key={index}
                                            variant="body1"
                                            sx={{
                                                fontSize: fontSize,
                                                lineHeight: 1.8,
                                                ml: line.startsWith('   -') ? 4 : 2,
                                                my: 1,
                                                '& strong': {
                                                    fontWeight: 'bold',
                                                    color: 'primary.main'
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{ __html: line }}
                                        />
                                    );
                                }
                                // 일반 텍스트
                                else if (line.trim()) {
                                    return (
                                        <Typography
                                            key={index}
                                            variant="body1"
                                            sx={{
                                                fontSize: fontSize,
                                                lineHeight: 1.8,
                                                my: 1
                                            }}
                                            dangerouslySetInnerHTML={{ __html: line }}
                                        />
                                    );
                                }
                                // 빈 줄
                                return <Box key={index} sx={{ height: '1rem' }} />;
                            })}
                        </Box>
                    )}

                    <Box sx={{
                        mt: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        width: '100%',
                        py: 3
                    }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/')}
                            sx={{
                                fontSize: fontSize,
                                py: 1.2,
                                px: 2,
                                borderRadius: 3,
                                textTransform: 'none',
                                flex: 1,
                                maxWidth: 200,
                                borderWidth: 2,
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                '&:hover': {
                                    borderWidth: 2,
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            {t("test.retry_test")}
                        </Button>
                        <Button
                            variant="contained"
                            onClick={captureAndSave}
                            sx={{
                                fontSize: fontSize,
                                py: 1.2,
                                px: 2,
                                borderRadius: 3,
                                textTransform: 'none',
                                flex: 1,
                                maxWidth: 200,
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 3,
                                fontWeight: 'bold',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {t("test.download_image")}
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="lg"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                px: { xs: 2, sm: 4 },
            }}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                height: '100%',
                position: 'relative'
            }}>
                <Box component="main" sx={{
                    flex: 1,
                    overflow: 'auto',
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Stack spacing={3} width='100%'>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{
                                fontSize: {
                                    xs: `${fontSize + 4}px`,
                                    sm: `${fontSize + 6}px`,
                                    md: `${fontSize + 8}px`
                                },
                                lineHeight: 1.3
                            }}
                        >
                            {questions[step].question}
                        </Typography>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: { xs: 14, sm: 16 } }}
                            >
                                {t("test.select_up_to_5")} ({answers[step]?.length || 0}/5)
                            </Typography>
                        </Stack>

                        <Grid
                            container
                            spacing={2}
                            justifyContent="center"
                            sx={{
                                width: '100%',
                                mx: 'auto',
                                '& .MuiGrid-item': {
                                    px: 1,
                                    py: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }
                            }}
                        >
                            {questions[step].options.map((option) => (
                                <Grid item xs={6} sm={4} md={3} key={option.id}>
                                    <Button
                                        fullWidth
                                        variant={isOptionSelected(option) ? "contained" : "outlined"}
                                        onClick={() => handleOptionClick(option.id)}
                                        disabled={!isOptionSelected(option) && answers[step]?.length >= 5}
                                        sx={{
                                            height: '100%',
                                            minHeight: '52px',
                                            whiteSpace: 'normal',
                                            textAlign: 'center',
                                            py: 0.5,
                                            px: 1,
                                            fontSize: {
                                                xs: `${fontSize - 2}px`,
                                                sm: `${fontSize}px`
                                            },
                                            lineHeight: 1.2,
                                            wordBreak: 'keep-all',
                                            wordWrap: 'break-word',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            '& .MuiButton-root': {
                                                textTransform: 'none',
                                                borderRadius: 1.5,
                                                padding: '4px 8px',
                                            },
                                            transition: 'all 0.2s ease',
                                            ...(isOptionSelected(option) && {
                                                transform: 'scale(0.98)'
                                            })
                                        }}
                                    >
                                        {option.text}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Box>

                <Box
                    component="footer"
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        bgcolor: 'background.paper',
                        py: 2,
                        pb: { xs: 3, sm: 5 },
                        px: { xs: 1, sm: 1 },
                        mt: 'auto'
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="space-between"
                    >
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleBack}
                            sx={{
                                flex: 1,
                                fontSize: fontSize
                            }}
                        >
                            {t("test.back_button")}
                        </Button>
                        {step < questions.length - 1 ? (
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                onClick={handleNext}
                                disabled={!answers[step]?.length}
                                sx={{
                                    flex: 1,
                                    py: { xs: 1.5, sm: 1 },
                                    fontSize: fontSize
                                }}
                            >
                                {t("test.next_button")}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                onClick={submitAnswers}
                                disabled={!answers[step]?.length}
                                sx={{
                                    flex: 1,
                                    py: { xs: 1.5, sm: 1 },
                                    fontSize: fontSize
                                }}
                            >
                                {t("test.submit_button")}
                            </Button>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default Test;