import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import 'dotenv/config'; // Didn't work shouldn't have tried to use env variables on client side code
import App from './App';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from './Contexts/AuthProvider';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ThemeProvider theme={theme}>
      <AuthProvider>

        <React.StrictMode>
          <App />
        </React.StrictMode>

      </AuthProvider>
    </ThemeProvider>
  </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
