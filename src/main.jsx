import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Dataprovider } from './components/Dataprovider/Dataprovider.jsx'
import { initialstate, reducer } from '../Utility/reducer.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dataprovider reducer={reducer} initialstate={initialstate}>
    <App />
    </Dataprovider>
  </StrictMode>,
)
