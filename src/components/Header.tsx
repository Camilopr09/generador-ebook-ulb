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
      alert('✅ Guardado perfectamente')
    }
  }

  return (
    <header style={{ 
      backgroundColor: 'var(--ulb-surface)',
      borderBottom: '1px solid var(--ulb-border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: isMobile ? '10px 12px' : '14px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: isMobile ? '8px' : '16px',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}>
        {/* Logo y título */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
          <div style={{
            width: isMobile ? "40px" : "44px",
            height: isMobile ? "40px" : "44px",
            borderRadius: '12px',
            background: 'var(--ulb-primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
            flexShrink: 0
          }}>
            📖
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1 style={{ 
              fontSize: isMobile ? '16px' : '18px', 
              fontWeight: '700', 
              color: 'var(--ulb-text)', 
              margin: 0, 
              letterSpacing: '-0.5px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {isMobile ? 'eBook Pro' : 'eBook Generator Pro'}
            </h1>
            {project && (
              <p style={{ 
                fontSize: isMobile ? '11px' : '12px', 
                color: 'var(--ulb-text-muted)', 
                margin: '2px 0 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontWeight: '500'
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
                padding: isMobile ? '8px 12px' : '10px 18px',
                fontSize: isMobile ? '13px' : '14px',
                minWidth: isMobile ? 'auto' : '120px',
                background: 'var(--ulb-primary-gradient)',
                color: 'white',
                fontWeight: '600'
              }}
              title={isMobile ? 'Guardar' : ''}
            >
              {isMobile ? '💾' : '✓ Guardar'}
            </button>

            {!isMobile && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', gap: '2px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--ulb-primary)' }}>
                  v{project.version}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--ulb-text-muted)', fontWeight: '500' }}>
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
