import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import AuthContextProvider from './contexts/AuthContext.jsx'
import AppContextProvider from './contexts/AppContext.jsx'
import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <App />
          </MantineProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
