import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { CssBaseline, Box } from '@mui/material';
import { useTheme } from './contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Test from "./components/Test";
import Admin from "./components/Admin";
import { Analytics } from "@vercel/analytics/react"

function App() {
  const { isDarkMode } = useTheme();

  return (
    <MUIThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Box 
          className="App"
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.paper',
            color: 'text.primary',
            pt: '56px'
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Analytics />
        </Box>
      </Router>
    </MUIThemeProvider>
  );
}

export default App;