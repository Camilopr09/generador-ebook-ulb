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
    <header className="bg-white border-b shadow-sm" style={{ borderColor: 'var(--ulb-border)' }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Logo ULB */}
          <div className="flex-shrink-0">
            <img 
              src="https://i.ibb.co/HDcvkJTw/logo.png" 
              alt="Universidad Libre Colombia" 
              width="56" 
              height="56"
              className="rounded-lg shadow-sm object-contain"
            />
          </div>

          {/* Información del proyecto */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--ulb-ink)' }}>
              Generador eBook
            </h1>
            {project && (
              <p className="text-sm mt-0.5" style={{ color: 'var(--ulb-text-muted)' }}>
                {project.name}
              </p>
            )}
          </div>
        </div>

        {/* Acciones y versión */}
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
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold" style={{ color: 'var(--ulb-primary)' }}>
                  v{project.version}
                </span>
                <span className="text-xs" style={{ color: 'var(--ulb-text-muted)' }}>
                  {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
