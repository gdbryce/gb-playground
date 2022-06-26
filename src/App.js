import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from './Contexts/AuthProvider';

import Landing from './Components/Landing/Landing';
import Home from './Components/Pages/Home';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#303030',
      dark: '#424242',
      contrastText: '#ff6e40',
      light: '#9e9e9e',
    },
    secondary: {
      main: '#ff6e40',
      dark: '#dd2c00',
      light: '#ffab91',
      contrastText: '#212121',
    },
    divider: '#dd2c00',
    text: {
      secondary: '#757575',
    },
    background: {
      default: '#eceff1',
      paper: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/Home" element={<Home />} />
            </Routes>
          </Router>
          
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
