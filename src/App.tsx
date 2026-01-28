import React, { useEffect } from 'react'
import { ProjectProvider, useProject } from './context/ProjectContext'
import { StorageService } from './services/storageService'
import { Header } from './components/Header'
import { ProjectSetup } from './components/ProjectSetup'
import { CoverDesigner } from './components/CoverDesigner'
import { PageDesigner } from './components/PageDesigner'
import { MainControls } from './components/MainControls'

const AppContent: React.FC = () => {
  const { project } = useProject()

  useEffect(() => { StorageService.init() }, [])

  if (!project) {
    return <ProjectSetup />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ulb-bg)' }}>
      <Header />
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
        {/* Grid superior: CoverDesigner + MainControls */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ gridColumn: window.innerWidth >= 1024 ? 'span 2' : 'auto' }}>
            <CoverDesigner />
          </div>
          <div>
            <MainControls />
          </div>
        </div>

        {/* PageDesigner */}
        <div style={{ minHeight: '384px' }}>
          <PageDesigner />
        </div>
      </main>
    </div>
  )
}

export function App() {
  return <ProjectProvider><AppContent /></ProjectProvider>
}