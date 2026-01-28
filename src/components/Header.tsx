import React from 'react'
import { useProject } from '../context/ProjectContext'
import { StorageService } from '../services/storageService'

export const Header: React.FC = () => {
  const { project } = useProject()

  const handleSave = async () => {
    if (project) {
      await StorageService.saveProject(project)
      alert('✅ Guardado')
    }
  }

  return (
    <header className="bg-white border-b" style={{ borderColor: 'var(--ulb-border)' }}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--ulb-ink)' }}>
            📚 Generador eBook ULB
          </h1>
          {project && (
            <p className="text-sm mt-1" style={{ color: 'var(--ulb-text-muted)' }}>
              {project.name}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {project && (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white rounded font-medium hover:shadow-lg transition"
                style={{
                  backgroundColor: 'var(--ulb-primary)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
              >
                💾 Guardar
              </button>
              <span className="text-sm whitespace-nowrap" style={{ color: 'var(--ulb-text-muted)' }}>
                v{project.version} • {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
