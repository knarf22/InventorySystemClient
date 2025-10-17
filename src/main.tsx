import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SidebarTabs from './components/Sidebar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <SidebarTabs />
  </StrictMode>,
)
