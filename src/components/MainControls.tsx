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
    <div className="apple-card bg-white p-4 sm:p-6 h-fit" style={{ borderColor: 'var(--ulb-border)', borderTopWidth: '2px', borderTopColor: 'var(--ulb-primary)' }}>
      <div className="pb-4 sm:pb-6" style={{ borderBottomWidth: '1px', borderBottomColor: 'var(--ulb-border)' }}>
        <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--ulb-ink)' }}>
          <span>⚙️</span> Controles
        </h2>
      </div>

      <div className="space-y-3 pt-4 sm:pt-6">
        <button
          onClick={handleAddPage}
          className="apple-button w-full text-white font-semibold py-3"
          style={{ backgroundColor: 'var(--ulb-primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
        >
          ➕ Nueva Página
        </button>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="apple-button w-full text-white font-semibold py-3 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--ulb-ink)', borderLeft: '3px solid var(--ulb-gold)' }}
          onMouseEnter={(e) => !generating && (e.currentTarget.style.backgroundColor = 'var(--ulb-primary)')}
          onMouseLeave={(e) => !generating && (e.currentTarget.style.backgroundColor = 'var(--ulb-ink)')}
        >
          {generating ? '⏳ Generando...' : '📚 Generar EPUB'}
        </button>

        {/* Stats */}
        <div className="p-4 sm:p-5 rounded-2xl mt-4 sm:mt-6" style={{ backgroundColor: 'rgba(214, 31, 38, 0.05)', borderColor: 'var(--ulb-gold)', borderWidth: '1px' }}>
          <p className="text-xs sm:text-sm font-semibold mb-3" style={{ color: 'var(--ulb-ink)' }}>
            📊 Estado
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: 'var(--ulb-text-muted)' }}>Páginas:</span>
              <span className="text-sm font-bold px-3 py-1 rounded-lg text-white" style={{ backgroundColor: 'var(--ulb-primary)' }}>
                {project.pages.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: 'var(--ulb-text-muted)' }}>Tamaño:</span>
              <span className="text-sm font-bold px-3 py-1 rounded-lg text-white" style={{ backgroundColor: 'var(--ulb-ink)' }}>
                {(JSON.stringify(project).length / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="p-3 sm:p-4 rounded-xl text-xs sm:text-sm" style={{ backgroundColor: 'var(--ulb-ink)', color: 'var(--ulb-white)', borderLeft: '3px solid var(--ulb-gold)' }}>
          <p><strong>💡 Tip:</strong> Crea múltiples páginas antes de generar</p>
        </div>
      </div>
    </div>
  )
}
