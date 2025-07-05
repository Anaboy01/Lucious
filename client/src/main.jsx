import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { AppProvider } from './context/AppContext'




createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AppProvider>
        <BrowserRouter>
 <App />
   <ToastContainer />
      </BrowserRouter>
    
  </AppProvider>
   
  </StrictMode>,
)
