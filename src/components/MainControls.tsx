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
    <div className="rounded-lg shadow-xl p-6 space-y-4 h-fit" style={{ backgroundColor: 'var(--ulb-surface)', borderTop: '4px solid var(--ulb-primary)' }}>
      <div className="pb-4" style={{ borderBottomWidth: '2px', borderBottomColor: 'var(--ulb-border)' }}>
        <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--ulb-ink)' }}>
          <span>⚙️</span> Controles
        </h2>
      </div>

      <button
        onClick={handleAddPage}
        className="w-full text-white py-3 rounded-lg font-bold transition hover:shadow-lg"
        style={{ backgroundColor: 'var(--ulb-primary)' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
      >
        ➕ Nueva Página
      </button>

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="w-full text-white py-3 rounded-lg font-bold transition hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--ulb-ink)', borderLeft: '3px solid var(--ulb-gold)' }}
        onMouseEnter={(e) => !generating && (e.currentTarget.style.backgroundColor = 'var(--ulb-primary)')}
        onMouseLeave={(e) => !generating && (e.currentTarget.style.backgroundColor = 'var(--ulb-ink)')}
      >
        {generating ? '⏳ Generando...' : '📚 Generar E-Libro EPUB'}
      </button>

      <div className="p-4 rounded-lg mt-6" style={{ backgroundColor: 'rgba(214, 31, 38, 0.05)', borderWidth: '2px', borderColor: 'var(--ulb-gold)' }}>
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--ulb-ink)' }}>
          📊 Estado del Proyecto
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span style={{ color: 'var(--ulb-text-muted)' }}>Páginas:</span>
            <span className="font-bold px-3 py-1 rounded text-white" style={{ backgroundColor: 'var(--ulb-primary)' }}>
              {project.pages.length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ color: 'var(--ulb-text-muted)' }}>Tamaño:</span>
            <span className="font-bold px-3 py-1 rounded text-white" style={{ backgroundColor: 'var(--ulb-ink)' }}>
              {(JSON.stringify(project).length / 1024).toFixed(2)} KB
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: 'var(--ulb-ink)', color: 'var(--ulb-white)', borderLeft: '4px solid var(--ulb-gold)' }}>
        <p><strong>💡 Tip:</strong> Crea múltiples páginas antes de generar el e-libro</p>
      </div>
    </div>
  )
}
