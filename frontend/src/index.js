import '@fontsource/inter';
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssVarsProvider } from '@mui/joy/styles';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

// Material Web Components imports (if needed)
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CssVarsProvider>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </CssVarsProvider>
  </React.StrictMode>
);

reportWebVitals();