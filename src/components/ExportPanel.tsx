import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { useResponsive } from '../hooks/useResponsive'
import { ExportService } from '../services/exportService'

export const ExportPanel: React.FC = () => {
  const { project } = useProject()
  const { isMobile } = useResponsive()
  const [exporting, setExporting] = useState(false)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  if (!project) return null

  const handleExport = async (format: string) => {
    setExporting(true)
    try {
      if (format === 'epub3') await ExportService.exportEPUB(project, 'epub3')
      else if (format === 'epub2') await ExportService.exportEPUB(project, 'epub2')
      else if (format === 'html') await ExportService.exportHTML(project)
      else if (format === 'project') ExportService.exportProject(project)
    } catch (error) {
      console.error('Error exportando:', error)
    }
    setExporting(false)
  }

  const exportButtons = [
    { id: 'epub3', label: 'EPUB 3', icon: '📕', gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)', color: '#6366F1' },
    { id: 'epub2', label: 'EPUB 2', icon: '📗', gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#10B981' },
    { id: 'html', label: 'HTML', icon: '🌐', gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', color: '#F59E0B' },
    { id: 'project', label: 'Proyecto', icon: '💾', gradient: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)', color: '#EC4899' }
  ]

  return (
    <div className="apple-card" style={{ 
      padding: isMobile ? '16px 18px' : '20px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background */}
      <div style={{
        position: 'absolute',
        top: -80,
        left: -80,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: isMobile ? '16px' : '20px' }}>
          <span style={{ fontSize: '28px' }}>📦</span>
          <h2 style={{ 
            fontSize: isMobile ? '18px' : '20px', 
            fontWeight: '700',
            background: 'var(--ulb-primary-gradient)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Exportar tu eBook
          </h2>
        </div>

        <p style={{
          fontSize: '13px',
          color: 'var(--ulb-text-muted)',
          marginBottom: isMobile ? '14px' : '18px',
          fontWeight: '500'
        }}>
          Elige el formato que prefieres para descargar tu obra
        </p>

        {/* Export Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '10px' : '12px'
        }}>
          {exportButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleExport(btn.id)}
              disabled={exporting}
              onMouseEnter={() => setHoveredButton(btn.id)}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                background: hoveredButton === btn.id ? btn.gradient : `linear-gradient(135deg, ${btn.color}99 0%, ${btn.color}77 100%)`,
                color: 'white',
                fontWeight: '700',
                padding: isMobile ? '12px 14px' : '14px 16px',
                fontSize: isMobile ? '13px' : '14px',
                border: 'none',
                borderRadius: '12px',
                cursor: exporting ? 'not-allowed' : 'pointer',
                boxShadow: hoveredButton === btn.id 
                  ? `0 12px 24px rgba(99, 102, 241, 0.3)` 
                  : `0 6px 12px rgba(99, 102, 241, 0.15)`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredButton === btn.id && !exporting ? 'translateY(-2px)' : 'translateY(0)',
                opacity: exporting ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span style={{ fontSize: '16px' }}>{btn.icon}</span>
              <span style={{ position: 'relative', zIndex: 2 }}>
                {isMobile ? btn.label.split(' ')[0] : btn.label}
              </span>

              {/* Shine effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                animation: hoveredButton === btn.id && !exporting ? 'shimmer 0.6s' : 'none'
              }} />
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div style={{
          marginTop: isMobile ? '14px' : '18px',
          padding: isMobile ? '12px 14px' : '14px 16px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.05) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.15)',
          fontSize: isMobile ? '12px' : '13px',
          color: 'var(--ulb-text-muted)',
          fontWeight: '500'
        }}>
          💡 <strong>Pro Tip:</strong> {isMobile ? 'EPUB es ideal para lectores' : 'Usa EPUB3 para lectores modernos, EPUB2 para compatibilidad, HTML para web'}
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
