import React, { useState, useEffect } from 'react'
import { useProject } from '../context/ProjectContext'

export const PageDesigner: React.FC = () => {
  const { project, updatePage } = useProject()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Actualizar selectedId cuando cambian las páginas
  useEffect(() => {
    if (project && project.pages.length > 0) {
      if (!selectedId || !project.pages.find(p => p.id === selectedId)) {
        setSelectedId(project.pages[project.pages.length - 1].id)
      }
    } else {
      setSelectedId(null)
    }
  }, [project?.pages.length])

  if (!project) return null

  const page = project.pages.find(p => p.id === selectedId)

  if (project.pages.length === 0) {
    return (
      <div className="rounded-lg shadow p-8 text-center" style={{ backgroundColor: 'var(--ulb-surface)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p className="text-lg" style={{ color: 'var(--ulb-text-muted)' }}>📄 No hay páginas creadas</p>
        <p className="text-sm mt-2" style={{ color: 'var(--ulb-text-muted)' }}>Crea una página desde el panel de controles</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg shadow" style={{ backgroundColor: 'var(--ulb-surface)', padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="flex items-center gap-2 mb-4">
        <span style={{ fontSize: '20px' }}>📄</span>
        <h2 className="text-xl font-bold" style={{ color: 'var(--ulb-ink)' }}>
          Editor de Páginas
        </h2>
      </div>

      {/* Lista de páginas */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {project.pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className="px-3 py-1 rounded text-sm font-medium whitespace-nowrap transition"
            style={{
              backgroundColor: selectedId === p.id ? 'var(--ulb-primary)' : 'var(--ulb-bg)',
              color: selectedId === p.id ? 'white' : 'var(--ulb-text)',
              borderColor: 'var(--ulb-border)',
              borderWidth: '1px'
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Contenido de la página seleccionada */}
      {page && (
        <div className="flex-1 overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ulb-ink)' }}>
              Título de la página
            </label>
            <input
              type="text"
              value={page.title}
              onChange={(e) => updatePage(page.id, { title: e.target.value })}
              className="w-full px-3 py-2 border rounded mb-4 focus:outline-none"
              style={{ borderColor: 'var(--ulb-border)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ulb-ink)' }}>
              Contenido
            </label>
            <div className="p-4 border rounded" style={{ backgroundColor: 'var(--ulb-bg)', borderColor: 'var(--ulb-border)', minHeight: '200px' }}>
              {page.elements.length === 0 ? (
                <p style={{ color: 'var(--ulb-text-muted)' }}>Sin contenido aún. Agrega elementos para comenzar.</p>
              ) : (
                <div className="space-y-2">
                  {page.elements.map((el) => (
                    <div key={el.id} className="p-2 rounded" style={{ backgroundColor: 'var(--ulb-surface)', borderLeft: `3px solid var(--ulb-primary)` }}>
                      <p className="text-xs font-semibold" style={{ color: 'var(--ulb-primary)' }}>
                        {el.type.toUpperCase()}
                      </p>
                      <p style={{ color: 'var(--ulb-text)' }}>
                        {el.content.substring(0, 100)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
