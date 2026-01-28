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
            <svg width="56" height="56" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              {/* Círculo exterior dorado */}
              <circle cx="100" cy="100" r="95" fill="none" stroke="#C9A24A" strokeWidth="8" />
              
              {/* Círculo negro */}
              <circle cx="100" cy="100" r="85" fill="#111111" />
              
              {/* Círculo rojo interior */}
              <circle cx="100" cy="100" r="75" fill="#D61F26" />
              
              {/* Escudo blanco */}
              <path d="M 100 50 L 130 70 L 130 95 Q 130 120 100 135 Q 70 120 70 95 L 70 70 Z" fill="white" stroke="white" strokeWidth="2" />
              
              {/* Libro en el escudo */}
              <path d="M 90 75 L 110 75 M 90 80 L 110 80 M 90 85 L 110 85 M 95 90 Q 100 95 105 90" 
                    stroke="#111111" strokeWidth="2" fill="none" strokeLinecap="round" />
              
              {/* Pluma en el escudo */}
              <path d="M 100 95 Q 100 110 100 125" stroke="#D61F26" strokeWidth="3" strokeLinecap="round" />
              <path d="M 98 120 L 100 125 L 102 120" fill="#D61F26" />
              
              {/* Texto en arco (UNIVERSIDAD LIBRE) */}
              <defs>
                <path id="topArc" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
                <path id="bottomArc" d="M 170,100 A 70,70 0 0,1 30,100" fill="none" />
              </defs>
              
              <text fontSize="16" fontWeight="bold" fill="white" letterSpacing="2">
                <textPath href="#topArc" startOffset="50%" textAnchor="middle">
                  UNIVERSIDAD LIBRE
                </textPath>
              </text>
              
              <text fontSize="14" fontWeight="bold" fill="white" letterSpacing="1">
                <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
                  COLOMBIA
                </textPath>
              </text>
            </svg>
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
