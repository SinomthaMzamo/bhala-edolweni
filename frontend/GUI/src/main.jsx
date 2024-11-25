import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Row from './ui/Row.jsx'
import Table from './ui/Table.jsx'
import View from './features/main/View.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Table/>
  </StrictMode>,
)
