import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState(16);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    // 테마 설정
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                },
                typography: {
                    fontSize: fontSize,
                },
            }),
        [isDarkMode, fontSize]
    );

    return (
        <ThemeContext.Provider 
            value={{ 
                isDarkMode, 
                toggleTheme, 
                fontSize, 
                setFontSize 
            }}
        >
            <MuiThemeProvider theme={theme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext;