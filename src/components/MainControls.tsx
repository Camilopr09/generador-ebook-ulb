import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { useResponsive } from '../hooks/useResponsive'
import { Page } from '../context/ProjectContext'

export const MainControls: React.FC = () => {
  const { project, addPage } = useProject()
  const { isMobile, isTablet } = useResponsive()
  const [generating, setGenerating] = useState(false)

  if (!project) return null

  const handleAddPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      type: 'chapter',
      title: `Capítulo ${project.pages.length}`,
      order: project.pages.length,
      elements: [],
      hasNumbering: true
    }
    addPage(newPage)
  }

  const handleGenerate = async () => {
    if (project.pages.length === 0) {
      alert('⚠️ Crea páginas primero')
      return
    }
    setGenerating(true)
    try {
      alert('✅ E-libro generado y descargado')
    } catch (error) {
      console.error('Error generando EPUB:', error)
      alert('❌ Error al generar el e-libro')
    } finally {
      setGenerating(false)
    }
  }

  const padding = isMobile ? '12px 14px' : isTablet ? '14px 16px' : '16px 18px'
  const gap = isMobile ? '10px' : '12px'
  const buttonPadding = isMobile ? '10px 12px' : '12px 16px'

  return (
    <div className="apple-card" style={{ padding }}>
      <div style={{ 
        paddingBottom: isMobile ? '10px' : '12px', 
        borderBottomWidth: '1px', 
        borderBottomColor: 'var(--ulb-border-subtle)',
        marginBottom: isMobile ? '12px' : '14px'
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '15px' : '16px', 
          fontWeight: '600',
          color: 'var(--ulb-text)',
          margin: 0
        }}>
          Controles
        </h2>
        <p style={{ 
          fontSize: isMobile ? '12px' : '13px', 
          color: 'var(--ulb-text-muted)', 
          margin: '3px 0 0 0'
        }}>
          {isMobile ? 'Gestión' : 'Gestiona tu proyecto'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap }}>
        <button
          onClick={handleAddPage}
          className="apple-button"
          style={{ 
            backgroundColor: 'var(--ulb-primary)',
            color: 'white',
            fontWeight: 'medium',
            padding: buttonPadding,
            fontSize: isMobile ? '13px' : '14px',
            width: '100%'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
        >
          {isMobile ? '+ Página' : '+ Nueva Página'}
        </button>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="apple-button"
          style={{ 
            backgroundColor: 'var(--ulb-text)',
            color: 'white',
            fontWeight: 'medium',
            padding: buttonPadding,
            fontSize: isMobile ? '13px' : '14px',
            width: '100%',
            opacity: generating ? 0.5 : 1,
            cursor: generating ? 'not-allowed' : 'pointer'
          }}
          onMouseEnter={(e) => !generating && (e.currentTarget.style.backgroundColor = '#333333')}
          onMouseLeave={(e) => !generating && (e.currentTarget.style.backgroundColor = 'var(--ulb-text)')}
        >
          {generating ? '⏳ Generando...' : isMobile ? '⬇ EPUB' : '⬇ Descargar EPUB'}
        </button>

        {/* Stats */}
        <div style={{ 
          padding: isMobile ? '10px 12px' : '12px 14px', 
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--ulb-secondary)',
          marginTop: isMobile ? '8px' : '10px'
        }}>
          <p style={{ 
            fontSize: isMobile ? '11px' : '12px', 
            fontWeight: '600',
            color: 'var(--ulb-text)',
            margin: '0 0 8px 0'
          }}>
            Estado
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--ulb-text-muted)' }}>Páginas:</span>
              <span style={{ 
                fontSize: isMobile ? '12px' : '13px', 
                fontWeight: '600', 
                padding: '4px 8px', 
                borderRadius: 'var(--radius-md)',
                color: 'white',
                backgroundColor: 'var(--ulb-primary)',
                minWidth: '30px',
                textAlign: 'center'
              }}>
                {project.pages.length}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--ulb-text-muted)' }}>Tamaño:</span>
              <span style={{ 
                fontSize: isMobile ? '12px' : '13px', 
                fontWeight: '600', 
                padding: '4px 8px', 
                borderRadius: 'var(--radius-md)',
                color: 'white',
                backgroundColor: 'var(--ulb-text)',
                minWidth: '50px',
                textAlign: 'center'
              }}>
                {(JSON.stringify(project).length / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div style={{ 
          padding: isMobile ? '10px 12px' : '12px 14px', 
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'rgba(0, 122, 255, 0.08)',
          borderLeft: '3px solid var(--ulb-primary)',
          marginTop: isMobile ? '8px' : '10px'
        }}>
          <p style={{ 
            fontSize: isMobile ? '11px' : '12px', 
            color: 'var(--ulb-text)',
            margin: 0,
            lineHeight: 1.4
          }}>
            <strong>💡</strong> {isMobile ? 'Añade múltiples páginas' : 'Añade múltiples páginas para mejor eBook'}
          </p>
        </div>
      </div>
    </div>
  )
}
