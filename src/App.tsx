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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Grid: responsive (1 columna en móvil, 3 en desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="lg:col-span-2">
            <CoverDesigner />
          </div>
          <div>
            <MainControls />
          </div>
        </div>

        {/* PageDesigner: altura adaptativa */}
        <div className="min-h-96 sm:h-96 lg:h-96">
          <PageDesigner />
        </div>
      </main>
    </div>
  )
}

export function App() {
  return <ProjectProvider><AppContent /></ProjectProvider>
}