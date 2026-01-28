import React, { useEffect, useState } from 'react'
import { ProjectProvider, useProject } from './context/ProjectContext'
import { StorageService } from './services/storageService'
import { Header } from './components/Header'
import { ProjectSetup } from './components/ProjectSetup'
import { MetadataEditor } from './components/MetadataEditor'
import { ThemeBuilder } from './components/ThemeBuilder'
import { ContentEditor } from './components/ContentEditor'
import { ValidationPanel } from './components/ValidationPanel'
import { ExportPanel } from './components/ExportPanel'

const AppContent: React.FC = () => {
  const { project } = useProject()
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'theme' | 'validate' | 'export'>('overview')

  useEffect(() => { StorageService.init() }, [])

  if (!project) {
    return <ProjectSetup />
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--ulb-bg)' }}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6" style={{ borderBottomColor: 'var(--ulb-border)', borderBottomWidth: '1px' }}>
          {(['overview', 'content', 'theme', 'validate', 'export'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 font-medium transition"
              style={{
                color: activeTab === tab ? 'var(--ulb-primary)' : 'var(--ulb-text-muted)',
                borderBottomColor: activeTab === tab ? 'var(--ulb-primary)' : 'transparent',
                borderBottomWidth: activeTab === tab ? '2px' : '0px'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            {activeTab === 'overview' && <MetadataEditor />}
            {activeTab === 'content' && project.pages.map(page => <ContentEditor key={page.id} page={page} />)}
            {activeTab === 'theme' && <ThemeBuilder />}
            {activeTab === 'validate' && <ValidationPanel />}
            {activeTab === 'export' && <ExportPanel />}
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg shadow" style={{ backgroundColor: 'var(--ulb-surface)' }}>
              <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--ulb-ink)' }}>
                📄 Páginas <span style={{ fontSize: '12px', color: 'var(--ulb-gold)' }}>({project.pages.length})</span>
              </h3>
              <ul className="space-y-1 text-sm max-h-48 overflow-y-auto">
                {project.pages.map(p => <li key={p.id} className="text-sm" style={{ color: 'var(--ulb-text-muted)' }}>• {p.title}</li>)}
              </ul>
            </div>
            <div className="p-4 rounded-lg shadow" style={{ backgroundColor: 'var(--ulb-surface)' }}>
              <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--ulb-ink)' }}>
                🖼️ Assets <span style={{ fontSize: '12px', color: 'var(--ulb-gold)' }}>({project.assets.length})</span>
              </h3>
              <p className="text-sm" style={{ color: 'var(--ulb-text-muted)' }}>Gestor de imágenes y recursos</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export function App() {
  return <ProjectProvider><AppContent /></ProjectProvider>
}