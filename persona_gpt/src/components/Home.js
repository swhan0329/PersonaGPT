import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Link, Stack } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { fontSize } = useTheme();

    return (
        <Box
            sx={{
                height: 'calc(100vh - 56px)',
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                overflow: 'hidden',
                position: 'fixed',
                width: '100%',
                top: '56px',
                left: 0
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    textAlign: "center",
                    maxWidth: 600,
                    width: "100%",
                    overflow: 'hidden',
                    bgcolor: 'background.paper'
                }}
            >
                <ExploreIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{ fontSize: fontSize + 24 }}  // 제목 크기 조정
                >
                    {t("home.title")}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        my: 3,
                        color: 'text.secondary',
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        px: 2,
                        fontSize: fontSize  // 본문 크기 조정
                    }}
                >
                    "{t("home.comment")}"
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/test")}
                    sx={{
                        mt: 1,
                        mb: 2,
                        fontSize: fontSize  // 버튼 텍스트 크기 조정
                    }}
                >
                    {t("home.start_button")}
                </Button>

                <Box sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Stack spacing={1} alignItems="center" justifyContent="center">
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: fontSize - 2  // 개발자 정보 크기 조정
                            }}
                        >
                            {t("home.developed_by")} Seowoo Han
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Link
                                href="https://github.com/swhan0329"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    color: 'text.primary',
                                    '&:hover': {
                                        color: 'primary.main'
                                    }
                                }}
                            >
                                <GitHubIcon sx={{ fontSize: 30 }} />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/seowoo-han-825486170/"
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    color: '#0A66C2',
                                    '&:hover': {
                                        opacity: 0.8
                                    }
                                }}
                            >
                                <LinkedInIcon sx={{ fontSize: 30 }} />
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default Home;