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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--ulb-bg)' }}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Grid superior: CoverDesigner (2 columnas) + MainControls (1 columna) */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <CoverDesigner />
          </div>
          <div>
            <MainControls />
          </div>
        </div>

        {/* Grid inferior: PageDesigner a altura fija */}
        <div style={{ height: '384px' }}>
          <PageDesigner />
        </div>
      </main>
    </div>
  )
}

export function App() {
  return <ProjectProvider><AppContent /></ProjectProvider>
}