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
    <header style={{ 
      backgroundColor: 'var(--ulb-surface)',
      borderBottom: '1px solid var(--ulb-border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      background: 'rgba(255, 255, 255, 0.95)'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Logo y título */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
          <img 
            src="https://i.ibb.co/HDcvkJTw/logo.png" 
            alt="Universidad Libre Colombia" 
            width="40" 
            height="40"
            style={{ borderRadius: '8px', objectFit: 'contain' }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--ulb-text)', margin: 0, letterSpacing: '-0.5px' }}>
              eBook Generator
            </h1>
            {project && (
              <p style={{ fontSize: '12px', color: 'var(--ulb-text-muted)', margin: '2px 0 0 0' }}>
                {project.name}
              </p>
            )}
          </div>
        </div>

        {/* Acciones */}
        {project && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleSave}
              className="apple-button"
              style={{ 
                color: 'white',
                backgroundColor: 'var(--ulb-primary)',
                display: window.innerWidth >= 640 ? 'flex' : 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
            >
              ✓ Guardar
            </button>

            {/* Botón móvil */}
            <button
              onClick={handleSave}
              className="apple-button"
              style={{ 
                padding: '8px 12px',
                color: 'white',
                backgroundColor: 'var(--ulb-primary)',
                display: window.innerWidth >= 640 ? 'none' : 'flex'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
            >
              ✓
            </button>

            <div style={{ display: window.innerWidth >= 640 ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', gap: '2px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ulb-primary)' }}>
                v{project.version}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--ulb-text-muted)' }}>
                {new Date(project.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
