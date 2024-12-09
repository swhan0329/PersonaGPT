import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0056D2', // 강렬한 파란색
      dark: '#003C9E', // 짙은 파란색
      light: '#4C8FFF', // 밝은 파란색
    },
    secondary: {
      main: '#FFC107', // 고급스러운 금색
      dark: '#C79100', // 짙은 금색
      light: '#FFD860', // 밝은 금색
    },
    background: {
      default: '#F9FAFB', // 밝고 깨끗한 배경
      paper: '#FFFFFF', // 종이 같은 깨끗한 배경
    },
    text: {
      primary: '#333333', // 어두운 회색 (가시성 높음)
      secondary: '#555555', // 중간 회색
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4C8FFF', // 밝은 파란색
      dark: '#0056D2', // 강렬한 파란색
      light: '#85B8FF', // 은은한 파란색
    },
    secondary: {
      main: '#FFC107', // 고급스러운 금색
      dark: '#C79100', // 짙은 금색
      light: '#FFD860', // 밝은 금색
    },
    background: {
      default: '#121212', // 어두운 배경 (눈부심 방지)
      paper: '#1E1E1E', // 약간 밝은 종이 배경
    },
    text: {
      primary: '#FFFFFF', // 흰색 텍스트
      secondary: '#BBBBBB', // 밝은 회색 텍스트
    },
  },
});
