import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, orange } from '@mui/material/colors';

import Landing from './Components/Landing/Landing';
import LoginTest from './Components/Utils/LoginTest';

const theme = createTheme({
  palette: {
    charcoal: {
      main: grey[900],
      light: grey[800],
      contrastText: orange["A700"]
    },
    fireAccent: {
      main: orange["A700"]
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/LoginTest" element={<LoginTest />} />
          </Routes>
        </Router>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
