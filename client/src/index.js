import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import App from './components/App';
import GlobalStyles from './lib/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import Footer from './components/Footer';

import { AuthProvider } from './lib/AuthProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple.A700,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <App />
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
