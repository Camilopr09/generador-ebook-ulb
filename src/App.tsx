import React, {useEffect} from 'react'
import {ProjectProvider} from './context/ProjectContext'
import {StorageService} from './services/storageService'
import {Header} from './components/Header'
import {CoverDesigner} from './components/CoverDesigner'
import {PageDesigner} from './components/PageDesigner'
import {MainControls} from './components/MainControls'

const AppContent: React.FC = () => {
  useEffect(() => {StorageService.init()}, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2"><CoverDesigner /></div>
          <div><MainControls /></div>
        </div>
        <div className="h-96"><PageDesigner /></div>
      </main>
    </div>
  )
}

export function App() {
  return <ProjectProvider><AppContent /></ProjectProvider>
}