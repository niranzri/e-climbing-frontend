import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import AuthContextProvider from './contexts/AuthContext.jsx'
import '@mantine/carousel/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
