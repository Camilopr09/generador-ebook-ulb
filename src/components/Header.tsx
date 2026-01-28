import React from 'react'
import { useProject } from '../context/ProjectContext'
import { StorageService } from '../services/storageService'
import { useResponsive } from '../hooks/useResponsive'

export const Header: React.FC = () => {
  const { project } = useProject()
  const { isMobile } = useResponsive()

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
        padding: isMobile ? '10px 12px' : '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: isMobile ? '8px' : '16px',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}>
        {/* Logo y título */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
          <img 
            src="https://i.ibb.co/HDcvkJTw/logo.png" 
            alt="Universidad Libre Colombia" 
            width={isMobile ? "36" : "40"}
            height={isMobile ? "36" : "40"}
            style={{ borderRadius: '8px', objectFit: 'contain', flexShrink: 0 }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{ 
              fontSize: isMobile ? '15px' : '17px', 
              fontWeight: '600', 
              color: 'var(--ulb-text)', 
              margin: 0, 
              letterSpacing: '-0.5px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {isMobile ? 'eBook' : 'eBook Generator'}
            </h1>
            {project && (
              <p style={{ 
                fontSize: isMobile ? '11px' : '12px', 
                color: 'var(--ulb-text-muted)', 
                margin: '2px 0 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {project.name}
              </p>
            )}
          </div>
        </div>

        {/* Acciones */}
        {project && (
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '12px' }}>
            <button
              onClick={handleSave}
              className="apple-button"
              style={{ 
                color: 'white',
                backgroundColor: 'var(--ulb-primary)',
                padding: isMobile ? '8px 10px' : '10px 16px',
                fontSize: isMobile ? '13px' : '15px',
                minWidth: isMobile ? 'auto' : '100px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
              title={isMobile ? 'Guardar' : ''}
            >
              {isMobile ? '✓' : '✓ Guardar'}
            </button>

            {!isMobile && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', gap: '2px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ulb-primary)' }}>
                  v{project.version}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--ulb-text-muted)' }}>
                  {new Date(project.updatedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
