import React from 'react'
import {useProject} from '../context/ProjectContext'
import {StorageService} from '../services/storageService'

export const Header: React.FC = () => {
  const {project} = useProject()

  const handleSave = async () => {
    if (project) {
      await StorageService.saveProject(project)
      alert('✅ Guardado')
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">📚 Generador eBook ULB</h1>
          {project && <p className="text-sm text-gray-600 mt-1">{project.name}</p>}
        </div>
        <div className="flex items-center gap-4">
          {project && (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
              >
                💾 Guardar
              </button>
              <span className="text-sm text-gray-600 whitespace-nowrap">
                v{project.version} • {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
