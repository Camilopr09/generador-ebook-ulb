import React, { useState, useEffect } from 'react'
import { useProject } from '../context/ProjectContext'

export const PageDesigner: React.FC = () => {
  const { project, updatePage } = useProject()
  const [selectedId, setSelectedId] = useState<string | null>(null)

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
      <div className="apple-card bg-white p-6 sm:p-8 text-center h-full flex flex-col justify-center items-center" style={{ borderColor: 'var(--ulb-border)' }}>
        <p className="text-lg sm:text-xl" style={{ color: 'var(--ulb-text-muted)' }}>📄 Sin páginas</p>
        <p className="text-sm mt-2" style={{ color: 'var(--ulb-text-muted)' }}>Crea una página desde los controles</p>
      </div>
    )
  }

  return (
    <div className="apple-card bg-white p-4 sm:p-6 h-full flex flex-col" style={{ borderColor: 'var(--ulb-border)' }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📄</span>
        <h2 className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--ulb-ink)' }}>
          Editor
        </h2>
      </div>

      {/* Pestañas de páginas */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
        {project.pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition"
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

      {/* Contenido */}
      {page && (
        <div className="flex-1 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2" style={{ color: 'var(--ulb-ink)' }}>
              Título
            </label>
            <input
              type="text"
              value={page.title}
              onChange={(e) => updatePage(page.id, { title: e.target.value })}
              className="apple-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2" style={{ color: 'var(--ulb-ink)' }}>
              Contenido ({page.elements.length} elementos)
            </label>
            <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--ulb-bg)', borderColor: 'var(--ulb-border)', borderWidth: '1px', minHeight: '150px' }}>
              {page.elements.length === 0 ? (
                <p className="text-xs sm:text-sm" style={{ color: 'var(--ulb-text-muted)' }}>
                  Sin contenido aún
                </p>
              ) : (
                <div className="space-y-2">
                  {page.elements.map((el) => (
                    <div key={el.id} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--ulb-surface)', borderLeft: '3px solid var(--ulb-primary)' }}>
                      <p className="text-xs font-semibold" style={{ color: 'var(--ulb-primary)' }}>
                        {el.type.toUpperCase()}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--ulb-text)' }}>
                        {el.content.substring(0, 80)}...
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
