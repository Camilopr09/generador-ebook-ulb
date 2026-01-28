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
    <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: 'var(--ulb-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-4">
        {/* Logo y título */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0">
            <img 
              src="https://i.ibb.co/HDcvkJTw/logo.png" 
              alt="Universidad Libre Colombia" 
              width="48" 
              height="48"
              className="rounded-lg shadow-sm object-contain"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold truncate" style={{ color: 'var(--ulb-ink)' }}>
              Generador eBook
            </h1>
            {project && (
              <p className="text-xs sm:text-sm truncate" style={{ color: 'var(--ulb-text-muted)' }}>
                {project.name}
              </p>
            )}
          </div>
        </div>

        {/* Acciones */}
        {project && (
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleSave}
              className="hidden sm:block apple-button text-white"
              style={{ backgroundColor: 'var(--ulb-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
            >
              💾 Guardar
            </button>

            {/* Botón guardar móvil */}
            <button
              onClick={handleSave}
              className="sm:hidden apple-button text-white p-2.5"
              style={{ backgroundColor: 'var(--ulb-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
            >
              💾
            </button>

            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-xs font-semibold" style={{ color: 'var(--ulb-primary)' }}>
                v{project.version}
              </span>
              <span className="text-xs" style={{ color: 'var(--ulb-text-muted)' }}>
                {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
