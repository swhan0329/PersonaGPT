import React from 'react';
import { Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { setFontSize } = useTheme();

    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
                px: 2,
                py: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2
            }}
        >
            <Box
                component="header"
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1100,
                    bgcolor: 'background.paper',
                    borderBottom: 1,
                    borderColor: 'divider',
                    px: 2,
                    py: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                        size="small"
                        color="inherit"
                    >
                        <TextFieldsIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                    <IconButton
                        onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                        size="small"
                        color="inherit"
                    >
                        <FormatSizeIcon sx={{ fontSize: '1.5rem' }} />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton
                        onClick={toggleTheme}
                        color="inherit"
                        sx={{
                            bgcolor: 'background.paper',
                            '&:hover': {
                                bgcolor: 'background.paper',
                                opacity: 0.8
                            }
                        }}
                    >
                        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                    <LanguageSwitcher />
                </Box>
            </Box>
            <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                    bgcolor: 'background.paper',
                    '&:hover': {
                        bgcolor: 'background.paper',
                        opacity: 0.8
                    }
                }}
            >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <LanguageSwitcher />
        </Box>
    );
};

export default Header;