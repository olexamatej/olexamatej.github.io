import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Writeups from './Writeups.jsx'
import './index.css'

// Check if we're on the writeups page
const isWriteupsPage = window.location.pathname.includes('/writeups');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isWriteupsPage ? <Writeups /> : <App />}
  </React.StrictMode>,
)
