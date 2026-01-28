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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6 border-b">
          {(['overview', 'content', 'theme', 'validate', 'export'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
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
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-bold mb-2">📄 Páginas ({project.pages.length})</h3>
              <ul className="space-y-1 text-sm">
                {project.pages.map(p => <li key={p.id} className="text-gray-600">{p.title}</li>)}
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-bold mb-2">🖼️ Assets ({project.assets.length})</h3>
              <p className="text-sm text-gray-600">Gestor de imágenes y recursos</p>
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