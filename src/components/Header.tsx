import React from 'react'
import {useProject} from '../context/ProjectContext'
import {StorageService} from '../services/storageService'

export const Header: React.FC = () => {
  const {project} = useProject()

  const handleSave = async () => {
    await StorageService.saveProject(project)
    alert('✅ Guardado')
  }

  return (
    <header className="bg-black border-b-4 border-red-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo ULB */}
            <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white font-bold text-xs text-center">UL</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">📚 Generador E-Books</h1>
              <p className="text-red-500 text-sm font-semibold">Universidad Libre de Barranquilla</p>
            </div>
          </div>
          <button onClick={handleSave} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 font-bold border border-white">
            💾 Guardar
          </button>
        </div>
      </div>
    </header>
  )
}
