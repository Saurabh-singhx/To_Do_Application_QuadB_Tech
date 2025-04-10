import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';
import { HashRouter } from "react-router-dom";
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <HashRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </HashRouter>

  </StrictMode>,
)
