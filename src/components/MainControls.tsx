import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { useResponsive } from '../hooks/useResponsive'
import { EpubService } from '../services/epubService'
import { Page } from '../context/ProjectContext'

export const MainControls: React.FC = () => {
  const { project, addPage } = useProject()
  const { isMobile, isTablet } = useResponsive()
  const [generating, setGenerating] = useState(false)
  const [hoverAddPage, setHoverAddPage] = useState(false)
  const [hoverDownload, setHoverDownload] = useState(false)

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
    if (!project.name || project.name.trim() === '') {
      alert('❌ El proyecto debe tener un nombre')
      return
    }

    setGenerating(true)
    try {
      await EpubService.generateAndDownloadEpub(project)
      alert('✅ ePub descargado correctamente')
    } catch (e: any) {
      console.error('Error generando EPUB:', e)
      alert(`❌ Error: ${e?.message || 'Error al generar el e-libro'}`)
    } finally {
      setGenerating(false)
    }
  }

  const padding = isMobile ? '14px 16px' : isTablet ? '16px 18px' : '18px 20px'
  const gap = isMobile ? '12px' : '14px'
  const buttonPadding = isMobile ? '11px 14px' : '13px 18px'

  return (
    <div className="apple-card" style={{ padding, position: 'relative', overflow: 'hidden' }}>
      {/* Decorative gradient background */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      <div style={{ 
        paddingBottom: isMobile ? '12px' : '14px', 
        borderBottomWidth: '1.5px', 
        borderBottomColor: 'rgba(99, 102, 241, 0.1)',
        marginBottom: isMobile ? '14px' : '16px',
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{ 
          fontSize: isMobile ? '16px' : '17px', 
          fontWeight: '700',
          background: 'var(--ulb-primary-gradient)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          ✨ Controles de Proyecto
        </h2>
        <p style={{ 
          fontSize: isMobile ? '12px' : '13px', 
          color: 'var(--ulb-text-muted)', 
          margin: '4px 0 0 0',
          fontWeight: '500'
        }}>
          {isMobile ? 'Gestiona tu obra' : 'Herramientas para gestionar tu obra maestra'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap, position: 'relative', zIndex: 1 }}>
        {/* Add Page Button - Indigo Gradient */}
        <button
          onClick={handleAddPage}
          onMouseEnter={() => setHoverAddPage(true)}
          onMouseLeave={() => setHoverAddPage(false)}
          className="apple-button"
          style={{ 
            background: hoverAddPage 
              ? 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)' 
              : 'linear-gradient(135deg, #DC2626 0%, #7F1D1D 100%)',
            color: 'white',
            fontWeight: '700',
            padding: buttonPadding,
            fontSize: isMobile ? '14px' : '15px',
            width: '100%',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: hoverAddPage 
              ? '0 12px 24px rgba(99, 102, 241, 0.35)' 
              : '0 8px 16px rgba(99, 102, 241, 0.25)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: hoverAddPage ? 'translateY(-2px)' : 'translateY(0)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span style={{ position: 'relative', zIndex: 2 }}>
            {isMobile ? '📄 Página' : '📄 Nueva Página'}
          </span>
          {/* Shine effect overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            animation: hoverAddPage ? 'shimmer 0.6s' : 'none'
          }} />
        </button>

        {/* Download EPUB Button - Fixed Version */}
        <button
          onClick={handleGenerate}
          disabled={generating}
          onMouseEnter={() => setHoverDownload(true)}
          onMouseLeave={() => setHoverDownload(false)}
          className="apple-button"
          style={{ 
            background: generating 
              ? 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)' 
              : hoverDownload
              ? 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)'
              : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
            color: 'white',
            fontWeight: '700',
            padding: buttonPadding,
            fontSize: isMobile ? '14px' : '15px',
            width: '100%',
            border: 'none',
            borderRadius: '12px',
            cursor: generating ? 'not-allowed' : 'pointer',
            boxShadow: generating
              ? '0 8px 16px rgba(99, 102, 241, 0.2)'
              : hoverDownload
              ? '0 12px 24px rgba(99, 102, 241, 0.35)'
              : '0 8px 16px rgba(99, 102, 241, 0.25)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: !generating && hoverDownload ? 'translateY(-2px)' : 'translateY(0)',
            opacity: generating ? 0.85 : 1,
            position: 'relative',
            overflow: 'hidden'
          }}
          title={generating ? 'Descargando...' : 'Descargar proyecto como ePub'}
        >
          <span style={{ position: 'relative', zIndex: 2 }}>
            {generating ? '⏳ Descargando...' : isMobile ? '⬇️ EPUB' : '⬇️ Descargar EPUB'}
          </span>
          {/* Shine effect overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
            animation: !generating && hoverDownload ? 'shimmer 0.6s' : 'none'
          }} />
        </button>

        {/* Premium Stats Card */}
        <div style={{ 
          padding: isMobile ? '12px 14px' : '14px 16px', 
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.05) 100%)',
          border: '1.5px solid rgba(99, 102, 241, 0.15)',
          marginTop: isMobile ? '10px' : '12px',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.08)'
        }}>
          <p style={{ 
            fontSize: isMobile ? '12px' : '13px', 
            fontWeight: '700',
            background: 'var(--ulb-primary-gradient)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            📊 Estado del Proyecto
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--ulb-text-muted)', fontWeight: '600' }}>
                Páginas:
              </span>
              <span style={{ 
                fontSize: isMobile ? '13px' : '14px', 
                fontWeight: '700', 
                padding: '5px 10px', 
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                color: 'white',
                minWidth: '35px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(220, 38, 38, 0.25)'
              }}>
                {project.pages.length}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--ulb-text-muted)', fontWeight: '600' }}>
                Tamaño:
              </span>
              <span style={{ 
                fontSize: isMobile ? '13px' : '14px', 
                fontWeight: '700', 
                padding: '5px 10px', 
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #000000 0%, #1F2937 100%)',
                color: 'white',
                minWidth: '35px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)'
              }}>
                {(JSON.stringify(project).length / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        </div>

        {/* Premium Tip Section */}
        <div style={{ 
          padding: isMobile ? '12px 14px' : '14px 16px', 
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.03) 100%)',
          border: '1.5px solid rgba(212, 175, 55, 0.15)',
          marginTop: isMobile ? '10px' : '12px',
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.06)',
          position: 'relative'
        }}>
          <p style={{ 
            fontSize: isMobile ? '12px' : '13px', 
            color: 'var(--ulb-text)',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: '600'
          }}>
            <span style={{ fontSize: '16px', marginRight: '6px' }}>💡</span>
            {isMobile ? 'Crea múltiples páginas para un eBook destacado' : '✨ Pro Tip: Añade múltiples páginas con contenido variado para crear un eBook profesional y atractivo'}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  )
}
