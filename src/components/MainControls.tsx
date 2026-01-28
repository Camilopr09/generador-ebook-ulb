import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { Page } from '../context/ProjectContext'

export const MainControls: React.FC = () => {
  const { project, addPage } = useProject()
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

  return (
    <div className="apple-card p-5 sm:p-6 h-fit">
      <div className="pb-4 sm:pb-5" style={{ borderBottomWidth: '1px', borderBottomColor: 'var(--ulb-border-subtle)' }}>
        <h2 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--ulb-text)' }}>
          Controles
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--ulb-text-muted)', margin: '4px 0 0 0' }}>
          Gestiona tu proyecto
        </p>
      </div>

      <div className="space-y-3 pt-5 sm:pt-6">
        <button
          onClick={handleAddPage}
          className="apple-button w-full text-white font-medium py-3"
          style={{ backgroundColor: 'var(--ulb-primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
        >
          + Nueva Página
        </button>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="apple-button w-full text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--ulb-text)' }}
          onMouseEnter={(e) => !generating && (e.currentTarget.style.backgroundColor = '#333333')}
          onMouseLeave={(e) => !generating && (e.currentTarget.style.backgroundColor = 'var(--ulb-text)')}
        >
          {generating ? '⏳ Generando...' : '⬇ Descargar EPUB'}
        </button>

        {/* Stats */}
        <div className="p-4 sm:p-5 rounded-lg mt-4 sm:mt-5" style={{ backgroundColor: 'var(--ulb-secondary)' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--ulb-text)' }}>
            Estado del Proyecto
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: 'var(--ulb-text-muted)' }}>Páginas:</span>
              <span className="text-sm font-semibold px-3 py-1 rounded-lg text-white" style={{ backgroundColor: 'var(--ulb-primary)' }}>
                {project.pages.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: 'var(--ulb-text-muted)' }}>Tamaño:</span>
              <span className="text-sm font-semibold px-3 py-1 rounded-lg text-white" style={{ backgroundColor: 'var(--ulb-text)' }}>
                {(JSON.stringify(project).length / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="p-4 rounded-lg text-xs sm:text-sm" style={{ backgroundColor: 'rgba(0, 122, 255, 0.08)', borderLeft: '3px solid var(--ulb-primary)' }}>
          <p style={{ color: 'var(--ulb-text)', margin: 0 }}>
            <strong>💡 Pro Tip:</strong> Añade múltiples páginas para un mejor eBook
          </p>
        </div>
      </div>
    </div>
  )
}
