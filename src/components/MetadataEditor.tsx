import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { useResponsive } from '../hooks/useResponsive'
import { CoverImageUploader } from './CoverImageUploader'

export const MetadataEditor: React.FC = () => {
  const { project, updateMetadata } = useProject()
  const { isMobile } = useResponsive()
  const [focusedField, setFocusedField] = useState<string | null>(null)

  if (!project) return null

  const { metadata } = project

  const inputStyle = (isFocused: boolean) => ({
    width: '100%',
    padding: isMobile ? '10px 12px' : '12px 14px',
    fontSize: isMobile ? '14px' : '15px',
    border: '2px solid rgba(99, 102, 241, 0.2)',
    borderRadius: '10px',
    background: isFocused ? 'rgba(99, 102, 241, 0.03)' : 'rgba(255, 255, 255, 0.5)',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    color: 'var(--ulb-text)',
    fontWeight: '500'
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px' }}>
      {/* Premium Metadata Card */}
      <div className="apple-card" style={{
        padding: isMobile ? '16px 18px' : '20px 24px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(236, 72, 153, 0.02) 100%)',
        border: '1.5px solid rgba(99, 102, 241, 0.1)'
      }}>
        {/* Decorative gradient */}
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: isMobile ? '16px' : '20px' }}>
            <span style={{ fontSize: '28px' }}>📋</span>
            <h2 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '700',
              background: 'var(--ulb-primary-gradient)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              Información del eBook
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '14px' }}>
            {/* Title */}
            <div>
              <label style={{
                display: 'block',
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '700',
                marginBottom: '6px',
                background: 'var(--ulb-primary-gradient)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                📖 Título
              </label>
              <input
                type="text"
                placeholder="Título del eBook"
                value={metadata.title}
                onChange={(e) => updateMetadata({ title: e.target.value })}
                onFocus={() => setFocusedField('title')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle(focusedField === 'title'),
                  borderColor: focusedField === 'title' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.2)',
                  boxShadow: focusedField === 'title' ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : 'none'
                }}
              />
            </div>

            {/* Subtitle */}
            <div>
              <label style={{
                display: 'block',
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '700',
                marginBottom: '6px',
                background: 'var(--ulb-primary-gradient)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ✨ Subtítulo (opcional)
              </label>
              <input
                type="text"
                placeholder="Subtítulo"
                value={metadata.subtitle}
                onChange={(e) => updateMetadata({ subtitle: e.target.value })}
                onFocus={() => setFocusedField('subtitle')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle(focusedField === 'subtitle'),
                  borderColor: focusedField === 'subtitle' ? 'rgba(236, 72, 153, 0.5)' : 'rgba(236, 72, 153, 0.2)',
                  boxShadow: focusedField === 'subtitle' ? '0 0 0 3px rgba(236, 72, 153, 0.1)' : 'none'
                }}
              />
            </div>

            {/* Authors */}
            <div>
              <label style={{
                display: 'block',
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '700',
                marginBottom: '6px',
                background: 'linear-gradient(90deg, #DC2626, #000000)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ✍️ Autores
              </label>
              <textarea
                placeholder="Autores (separados por coma)"
                value={metadata.authors.join(', ')}
                onChange={(e) => updateMetadata({ authors: e.target.value.split(',').map(a => a.trim()) })}
                onFocus={() => setFocusedField('authors')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle(focusedField === 'authors'),
                  minHeight: isMobile ? '80px' : '100px',
                  resize: 'none',
                  borderColor: focusedField === 'authors' ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.2)',
                  boxShadow: focusedField === 'authors' ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : 'none'
                }}
              />
            </div>

            {/* Two Column Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '12px' : '14px'
            }}>
              {/* Editor */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: isMobile ? '12px' : '13px',
                  fontWeight: '700',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #10B981, #059669)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🏢 Editorial
                </label>
                <input
                  type="text"
                  placeholder="Editorial"
                  value={metadata.editor}
                  onChange={(e) => updateMetadata({ editor: e.target.value })}
                  onFocus={() => setFocusedField('editor')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle(focusedField === 'editor'),
                    borderColor: focusedField === 'editor' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(16, 185, 129, 0.2)',
                    boxShadow: focusedField === 'editor' ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none'
                  }}
                />
              </div>

              {/* ISBN */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: isMobile ? '12px' : '13px',
                  fontWeight: '700',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #F59E0B, #D97706)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🔢 ISBN
                </label>
                <input
                  type="text"
                  placeholder="ISBN"
                  value={metadata.isbn}
                  onChange={(e) => updateMetadata({ isbn: e.target.value })}
                  onFocus={() => setFocusedField('isbn')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle(focusedField === 'isbn'),
                    borderColor: focusedField === 'isbn' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(245, 158, 11, 0.2)',
                    boxShadow: focusedField === 'isbn' ? '0 0 0 3px rgba(245, 158, 11, 0.1)' : 'none'
                  }}
                />
              </div>

              {/* Language */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: isMobile ? '12px' : '13px',
                  fontWeight: '700',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #991B1B, #7F1D1D)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  🌐 Idioma
                </label>
                <select
                  value={metadata.language}
                  onChange={(e) => updateMetadata({ language: e.target.value })}
                  onFocus={() => setFocusedField('language')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle(focusedField === 'language'),
                    borderColor: focusedField === 'language' ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.2)',
                    boxShadow: focusedField === 'language' ? '0 0 0 3px rgba(139, 92, 246, 0.1)' : 'none'
                  }}
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="pt">Português</option>
                </select>
              </div>

              {/* License */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: isMobile ? '12px' : '13px',
                  fontWeight: '700',
                  marginBottom: '6px',
                  background: 'linear-gradient(90deg, #000000, #111827)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  ⚖️ Licencia
                </label>
                <select
                  value={metadata.license}
                  onChange={(e) => updateMetadata({ license: e.target.value })}
                  onFocus={() => setFocusedField('license')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle(focusedField === 'license'),
                    borderColor: focusedField === 'license' ? 'rgba(236, 72, 153, 0.5)' : 'rgba(236, 72, 153, 0.2)',
                    boxShadow: focusedField === 'license' ? '0 0 0 3px rgba(236, 72, 153, 0.1)' : 'none'
                  }}
                >
                  <option value="CC-BY-SA">CC-BY-SA</option>
                  <option value="CC-BY">CC-BY</option>
                  <option value="CC-BY-NC">CC-BY-NC</option>
                  <option value="Todos los derechos reservados">Todos los derechos reservados</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={{
                display: 'block',
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '700',
                marginBottom: '6px',
                background: 'linear-gradient(90deg, #DC2626, #991B1B)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                📝 Descripción
              </label>
              <textarea
                placeholder="Descripción del eBook"
                value={metadata.description}
                onChange={(e) => updateMetadata({ description: e.target.value })}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle(focusedField === 'description'),
                  minHeight: isMobile ? '100px' : '120px',
                  resize: 'none',
                  borderColor: focusedField === 'description' ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)',
                  boxShadow: focusedField === 'description' ? '0 0 0 3px rgba(212, 175, 55, 0.1)' : 'none'
                }}
              />
            </div>

            {/* Keywords */}
            <div>
              <label style={{
                display: 'block',
                fontSize: isMobile ? '12px' : '13px',
                fontWeight: '700',
                marginBottom: '6px',
                background: 'linear-gradient(90deg, #000000, #0F172A)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                🏷️ Palabras clave
              </label>
              <textarea
                placeholder="Palabras clave (separadas por coma)"
                value={metadata.keywords.join(', ')}
                onChange={(e) => updateMetadata({ keywords: e.target.value.split(',').map(k => k.trim()) })}
                onFocus={() => setFocusedField('keywords')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputStyle(focusedField === 'keywords'),
                  minHeight: isMobile ? '80px' : '100px',
                  resize: 'none',
                  borderColor: focusedField === 'keywords' ? 'rgba(236, 72, 153, 0.5)' : 'rgba(236, 72, 153, 0.2)',
                  boxShadow: focusedField === 'keywords' ? '0 0 0 3px rgba(236, 72, 153, 0.1)' : 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cover Uploader */}
      <CoverImageUploader />
    </div>
  )
}
