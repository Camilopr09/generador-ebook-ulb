import React, { useState, useEffect } from 'react'
import { useProject } from '../context/ProjectContext'
import { ContentElement } from '../context/ProjectContext'

export const PageDesigner: React.FC = () => {
  const { project, updatePage } = useProject()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [editingElementId, setEditingElementId] = useState<string | null>(null)
  const [showAddElement, setShowAddElement] = useState(false)
  const [elementType, setElementType] = useState<'p' | 'h1' | 'h2' | 'h3' | 'image'>('p')
  const [elementContent, setElementContent] = useState('')

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

  const handleAddElement = () => {
    if (!page || !elementContent.trim()) {
      alert('Ingresa contenido')
      return
    }

    const newElement: ContentElement = {
      id: Date.now().toString(),
      type: elementType,
      content: elementContent,
      htmlContent: elementContent,
      metadata: {}
    }

    const updatedElements = [...page.elements, newElement]
    updatePage(page.id, { elements: updatedElements })
    
    setElementContent('')
    setShowAddElement(false)
    setElementType('p')
  }

  const handleUpdateElement = (elementId: string, newContent: string) => {
    if (!page) return

    const updatedElements = page.elements.map(el =>
      el.id === elementId
        ? { ...el, content: newContent, htmlContent: newContent }
        : el
    )
    updatePage(page.id, { elements: updatedElements })
  }

  const handleDeleteElement = (elementId: string) => {
    if (!page) return

    const updatedElements = page.elements.filter(el => el.id !== elementId)
    updatePage(page.id, { elements: updatedElements })
    setEditingElementId(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, elementId?: string) => {
    const file = event.target.files?.[0]
    if (!file || !page) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const imageData = e.target?.result as string
      
      if (elementId) {
        // Actualizar elemento existente
        const updatedElements = page.elements.map(el =>
          el.id === elementId
            ? { ...el, content: imageData, type: 'image' as const }
            : el
        )
        updatePage(page.id, { elements: updatedElements })
      } else {
        // Crear nuevo elemento con imagen
        const newElement: ContentElement = {
          id: Date.now().toString(),
          type: 'image',
          content: imageData,
          metadata: { filename: file.name }
        }
        const updatedElements = [...page.elements, newElement]
        updatePage(page.id, { elements: updatedElements })
        setShowAddElement(false)
      }
    }
    reader.readAsDataURL(file)
  }

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
          Editor de Páginas
        </h2>
      </div>

      {/* Pestañas de páginas */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '16px', 
        overflowX: 'auto',
        paddingBottom: '12px',
        borderBottom: '2px solid var(--ulb-border)'
      }}>
        {project.pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px 8px 0 0',
              fontSize: '13px',
              fontWeight: selectedId === p.id ? '700' : '600',
              whiteSpace: 'nowrap',
              border: 'none',
              backgroundColor: selectedId === p.id ? 'white' : 'transparent',
              color: selectedId === p.id ? 'var(--ulb-primary)' : 'var(--ulb-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderBottom: selectedId === p.id ? '3px solid var(--ulb-primary)' : 'none',
              position: 'relative',
              bottom: '-2px'
            }}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {page && (
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Título de página */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--ulb-ink)' }}>
              Título de la Página
            </label>
            <input
              type="text"
              value={page.title}
              onChange={(e) => updatePage(page.id, { title: e.target.value })}
              className="apple-input"
              placeholder="Ej: Capítulo 1"
            />
          </div>

          {/* Editor de elementos */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ulb-ink)' }}>
                Contenido ({page.elements.length})
              </label>
              <button
                onClick={() => setShowAddElement(!showAddElement)}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {showAddElement ? '✕ Cancelar' : '+ Agregar'}
              </button>
            </div>

            {/* Formulario para añadir elemento */}
            {showAddElement && (
              <div style={{
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
              }}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ulb-ink)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Tipo de Elemento
                  </label>
                  <select
                    value={elementType}
                    onChange={(e) => setElementType(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid rgba(99, 102, 241, 0.3)',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      fontWeight: '500',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--ulb-primary)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <option value="p">📝 Párrafo</option>
                    <option value="h1">🔤 Título 1</option>
                    <option value="h2">📋 Título 2</option>
                    <option value="h3">📑 Título 3</option>
                    <option value="image">🖼️ Imagen</option>
                  </select>
                </div>

                {elementType === 'image' ? (
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ulb-ink)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Selecciona una Imagen
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e)}
                      style={{
                        width: '100%',
                        padding: '12px 12px',
                        borderRadius: '8px',
                        border: '2px dashed rgba(99, 102, 241, 0.3)',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--ulb-ink)', marginBottom: '8px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Contenido
                    </label>
                    <textarea
                      value={elementContent}
                      onChange={(e) => setElementContent(e.target.value)}
                      placeholder={elementType === 'h1' ? 'Ej: Mi Primer Capítulo' : elementType === 'h2' ? 'Ej: Sección importante' : 'Escribe el contenido aquí...'}
                      style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: '12px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid rgba(99, 102, 241, 0.3)',
                        fontSize: '13px',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = 'var(--ulb-primary)'
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                )}

                <button
                  onClick={handleAddElement}
                  style={{
                    width: '100%',
                    marginTop: '14px',
                    padding: '12px 12px',
                    borderRadius: '8px',
                  background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                  color: 'white',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  ✨ Agregar Elemento
                </button>
              </div>
            )}

            {/* Lista de elementos */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '500px',
              overflowY: 'auto'
            }}>
              {page.elements.length === 0 ? (
                <div style={{
                  fontSize: '48px',
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: 'var(--ulb-text-muted)',
                  backgroundColor: 'var(--ulb-bg)',
                  borderRadius: '12px',
                  border: '2px dashed var(--ulb-border)'
                }}>
                  <p style={{ fontSize: '32px', margin: '0 0 8px 0' }}>📄</p>
                  <p style={{ fontSize: '13px', margin: '0', fontWeight: '600' }}>Sin contenido</p>
                  <p style={{ fontSize: '12px', margin: '4px 0 0 0', color: 'var(--ulb-text-muted)' }}>Agrega elementos para empezar</p>
                </div>
              ) : (
                page.elements.map((el, idx) => (
                  <div
                    key={el.id}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      backgroundColor: editingElementId === el.id ? 'rgba(99, 102, 241, 0.08)' : 'var(--ulb-bg)',
                      border: `2px ${editingElementId === el.id ? 'solid var(--ulb-primary)' : 'solid var(--ulb-border)'}`,
                      transition: 'all 0.2s',
                      boxShadow: editingElementId === el.id ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                      {/* Número de elemento */}
                      <div style={{
                        minWidth: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        backgroundColor: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '700',
                        flexShrink: 0
                      }}>
                        {idx + 1}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        {editingElementId === el.id ? (
                          el.type === 'image' ? (
                            <div>
                              <div style={{
                                width: '100%',
                                height: '180px',
                                borderRadius: '8px',
                                backgroundColor: 'var(--ulb-bg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '10px',
                                overflow: 'hidden',
                                border: '1px solid var(--ulb-border)'
                              }}>
                                {el.content && el.content.startsWith('data:') ? (
                                  <img src={el.content} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                ) : (
                                  <p style={{ color: 'var(--ulb-text-muted)', fontSize: '14px' }}>📷 Sin imagen</p>
                                )}
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, el.id)}
                                style={{
                                  width: '100%',
                                  padding: '10px 12px',
                                  borderRadius: '8px',
                                  border: '2px dashed var(--ulb-primary)',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  fontWeight: '600'
                                }}
                              />
                            </div>
                          ) : (
                            <textarea
                              value={el.content}
                              onChange={(e) => handleUpdateElement(el.id, e.target.value)}
                              style={{
                                width: '100%',
                                minHeight: '100px',
                                padding: '12px 12px',
                                borderRadius: '8px',
                                border: '2px solid var(--ulb-primary)',
                                fontSize: '13px',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                fontWeight: '500',
                                boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)'
                              }}
                            />
                          )
                        ) : (
                          <div>
                            <p style={{
                              fontSize: '10px',
                              fontWeight: '700',
                              color: 'var(--ulb-primary)',
                              margin: '0 0 6px 0',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px'
                            }}>
                              {el.type === 'h1' ? '🔤 Título 1' : el.type === 'h2' ? '📋 Título 2' : el.type === 'h3' ? '📑 Título 3' : el.type === 'image' ? '🖼️ Imagen' : '📝 Párrafo'}
                            </p>
                            {el.type === 'image' ? (
                              <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '8px',
                                backgroundColor: 'var(--ulb-bg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                border: '1px solid var(--ulb-border)'
                              }}>
                                {el.content && el.content.startsWith('data:') ? (
                                  <img src={el.content} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                ) : (
                                  <span style={{ fontSize: '24px' }}>📷</span>
                                )}
                              </div>
                            ) : (
                              <p style={{
                                fontSize: el.type === 'h1' ? '16px' : el.type === 'h2' ? '14px' : '12px',
                                fontWeight: el.type.startsWith('h') ? '700' : '500',
                                color: 'var(--ulb-text)',
                                margin: '0',
                                lineHeight: '1.5',
                                wordBreak: 'break-word',
                                maxHeight: '60px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {el.content}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Botones */}
                      <div style={{
                        display: 'flex',
                        gap: '6px',
                        flexShrink: 0
                      }}>
                        <button
                          onClick={() => setEditingElementId(editingElementId === el.id ? null : el.id)}
                          title={editingElementId === el.id ? 'Guardar cambios' : 'Editar elemento'}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            border: 'none',
                            backgroundColor: editingElementId === el.id ? 'var(--ulb-primary)' : 'var(--ulb-bg)',
                            color: editingElementId === el.id ? 'white' : 'var(--ulb-text)',
                            cursor: 'pointer',
                            fontWeight: '700',
                            transition: 'all 0.2s',
                            boxShadow: editingElementId === el.id ? '0 2px 8px rgba(99, 102, 241, 0.3)' : 'none'
                          }}
                          onMouseOver={(e) => {
                            if (editingElementId !== el.id) {
                              e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'
                            }
                          }}
                          onMouseOut={(e) => {
                            if (editingElementId !== el.id) {
                              e.currentTarget.style.backgroundColor = 'var(--ulb-bg)'
                            }
                          }}
                        >
                          {editingElementId === el.id ? '✓' : '✎'}
                        </button>
                        <button
                          onClick={() => handleDeleteElement(el.id)}
                          title="Eliminar elemento"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            border: '1.5px solid #ff6b6b',
                            backgroundColor: '#fff0f0',
                            color: '#d81b21',
                            cursor: 'pointer',
                            fontWeight: '700',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#ffe0e0'
                            e.currentTarget.style.transform = 'scale(1.05)'
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff0f0'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
