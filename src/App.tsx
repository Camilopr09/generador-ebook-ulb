import React, { useEffect } from 'react'
import { ProjectProvider, useProject } from './context/ProjectContext'
import { StorageService } from './services/storageService'
import { Header } from './components/Header'
import { ProjectSetup } from './components/ProjectSetup'
import { CoverDesigner } from './components/CoverDesigner'
import { PageDesigner } from './components/PageDesigner'
import { MainControls } from './components/MainControls'
import { useResponsive } from './hooks/useResponsive'

const AppContent: React.FC = () => {
  const { project } = useProject()
  const { isMobile, isTablet, isDesktop } = useResponsive()

  useEffect(() => { StorageService.init() }, [])

  if (!project) {
    return <ProjectSetup />
  }

  // Responsive grid configuration
  let gridConfig = {
    columns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    coverSpan: 2,
  }

  if (isMobile) {
    gridConfig = { columns: '1fr', gap: '14px', coverSpan: 1 }
  } else if (isTablet) {
    gridConfig = { columns: 'repeat(2, 1fr)', gap: '16px', coverSpan: 2 }
  } else if (isDesktop) {
    gridConfig = { columns: 'repeat(3, 1fr)', gap: '20px', coverSpan: 2 }
  }

  const padding = isMobile ? '12px' : isTablet ? '16px' : '20px'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ulb-bg)' }}>
      <Header />
      <main style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: `${padding} ${padding}`,
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Grid superior: CoverDesigner + MainControls */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: gridConfig.columns,
          gap: gridConfig.gap,
          marginBottom: isMobile ? '16px' : '24px'
        }}>
          <div style={{ gridColumn: `span ${gridConfig.coverSpan}` }}>
            <CoverDesigner />
          </div>
          {!isMobile && (
            <div>
              <MainControls />
            </div>
          )}
        </div>

        {/* Mobile Controls - Only on mobile */}
        {isMobile && (
          <div style={{ marginBottom: '16px' }}>
            <MainControls />
          </div>
        )}

        {/* PageDesigner */}
        <div style={{ minHeight: isMobile ? '300px' : '400px' }}>
          <PageDesigner />
        </div>
      </main>
    </div>
  )
}

export function App() {
  return <ProjectProvider><AppContent /></ProjectProvider>
}