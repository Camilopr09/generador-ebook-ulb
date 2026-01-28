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
      <div className="apple-card" style={{ 
        backgroundColor: 'white', 
        padding: '32px',
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p style={{ fontSize: '18px', color: 'var(--ulb-text-muted)' }}>📄 Sin páginas</p>
        <p style={{ fontSize: '14px', marginTop: '8px', color: 'var(--ulb-text-muted)' }}>
          Crea una página desde los controles
        </p>
      </div>
    )
  }

  return (
    <div className="apple-card" style={{ 
      backgroundColor: 'white', 
      padding: '24px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '20px' }}>📄</span>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--ulb-ink)', margin: 0 }}>
          Editor
        </h2>
      </div>

      {/* Pestañas */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '16px', 
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        {project.pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              border: `1px solid var(--ulb-border)`,
              backgroundColor: selectedId === p.id ? 'var(--ulb-primary)' : 'var(--ulb-bg)',
              color: selectedId === p.id ? 'white' : 'var(--ulb-text)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {page && (
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--ulb-ink)' }}>
              Título
            </label>
            <input
              type="text"
              value={page.title}
              onChange={(e) => updatePage(page.id, { title: e.target.value })}
              className="apple-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--ulb-ink)' }}>
              Contenido ({page.elements.length} elementos)
            </label>
            <div style={{ 
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'var(--ulb-bg)',
              border: '1px solid var(--ulb-border)',
              minHeight: '150px'
            }}>
              {page.elements.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--ulb-text-muted)' }}>
                  Sin contenido aún
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {page.elements.map((el) => (
                    <div key={el.id} style={{ 
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      borderLeft: '3px solid var(--ulb-primary)'
                    }}>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--ulb-primary)', margin: 0 }}>
                        {el.type.toUpperCase()}
                      </p>
                      <p style={{ fontSize: '12px', marginTop: '4px', color: 'var(--ulb-text)' }}>
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
