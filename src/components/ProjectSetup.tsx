import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { useResponsive } from '../hooks/useResponsive'
import { TemplateService } from '../services/templateService'

export const ProjectSetup: React.FC = () => {
  const { createProject } = useProject()
  const { isMobile } = useResponsive()
  const [projectName, setProjectName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const templates = TemplateService.getAllTemplates()

  const handleCreateProject = (templateId: string) => {
    if (!projectName.trim()) {
      alert('Por favor ingresa un nombre para el proyecto')
      return
    }
    setCreating(true)
    createProject(projectName, templateId as any)
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8F7FF 0%, #FFF5F7 50%, #FFF8F0 100%)',
      padding: isMobile ? '20px 16px' : '40px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '32px' : '48px' }}>
          <div style={{
            fontSize: isMobile ? '48px' : '56px',
            marginBottom: '16px',
            animation: 'float 3s ease-in-out infinite'
          }}>
            ✨
          </div>

          <h1 style={{ 
            fontSize: isMobile ? '28px' : '36px', 
            fontWeight: '800',
            background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px',
            margin: 0
          }}>
            🚀 Crea tu Obra Maestra
          </h1>

          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            color: 'var(--ulb-text-muted)',
            fontWeight: '600',
            marginTop: '16px'
          }}>
            Elige una plantilla premium y comienza a crear tu eBook increíble
          </p>

          {/* Gradient divider */}
          <div style={{
            height: '3px',
            width: '80px',
            background: 'linear-gradient(90deg, #6366F1, #EC4899, #D4AF37)',
            borderRadius: '2px',
            margin: '20px auto 0'
          }} />
        </div>

        {/* Setup Card */}
        <div className="apple-card" style={{
          padding: isMobile ? '20px 18px' : '28px 32px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(99, 102, 241, 0.1)',
          boxShadow: '0 16px 40px rgba(99, 102, 241, 0.1)',
          marginBottom: '24px'
        }}>
          {/* Input Section */}
          <div style={{ marginBottom: isMobile ? '24px' : '32px' }}>
            <label style={{
              display: 'block',
              fontSize: isMobile ? '14px' : '15px',
              fontWeight: '700',
              marginBottom: '10px',
              background: 'var(--ulb-primary-gradient)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📚 Nombre de tu Proyecto
            </label>
            <input
              type="text"
              placeholder="Mi Increíble eBook"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && selectedTemplate && handleCreateProject(selectedTemplate)}
              autoFocus
              style={{
                width: '100%',
                padding: isMobile ? '12px 14px' : '14px 16px',
                fontSize: isMobile ? '14px' : '15px',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Templates Grid */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: isMobile ? '14px' : '15px',
              fontWeight: '700',
              marginBottom: '14px',
              background: 'linear-gradient(90deg, #6366F1, #EC4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🎨 Selecciona una Plantilla
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '12px' : '14px'
            }}>
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                  style={{
                    padding: isMobile ? '14px 16px' : '16px 18px',
                    borderRadius: '12px',
                    border: selectedTemplate === template.id 
                      ? '2px solid #6366F1'
                      : '2px solid rgba(99, 102, 241, 0.2)',
                    background: selectedTemplate === template.id
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)'
                      : hoveredTemplate === template.id
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(236, 72, 153, 0.02) 100%)'
                      : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: selectedTemplate === template.id || hoveredTemplate === template.id 
                      ? 'translateY(-2px)' 
                      : 'translateY(0)',
                    boxShadow: selectedTemplate === template.id
                      ? '0 12px 24px rgba(99, 102, 241, 0.2)'
                      : hoveredTemplate === template.id
                      ? '0 8px 16px rgba(99, 102, 241, 0.1)'
                      : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <span style={{ fontSize: '24px', marginTop: '2px' }}>
                      {template.id === 'novel' ? '📖' : template.id === 'textbook' ? '📚' : '✍️'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{
                        fontSize: isMobile ? '14px' : '15px',
                        fontWeight: '700',
                        background: selectedTemplate === template.id 
                          ? 'var(--ulb-primary-gradient)'
                          : 'linear-gradient(90deg, #333, #555)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: '0 0 4px 0'
                      }}>
                        {template.name}
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        color: 'var(--ulb-text-muted)',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        Plantilla: {template.id}
                      </p>
                    </div>

                    {selectedTemplate === template.id && (
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: 'white',
                        fontWeight: 'bold'
                      }}>
                        ✓
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Button */}
        {selectedTemplate && (
          <div style={{ textAlign: 'center', animation: 'slideUp 0.4s ease' }}>
            <button
              onClick={() => handleCreateProject(selectedTemplate)}
              disabled={creating}
              style={{
                padding: isMobile ? '14px 24px' : '16px 48px',
                fontSize: isMobile ? '15px' : '16px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: creating ? 'not-allowed' : 'pointer',
                boxShadow: '0 16px 32px rgba(99, 102, 241, 0.3)',
                transition: 'all 0.3s ease',
                transform: creating ? 'scale(0.98)' : 'scale(1)',
                opacity: creating ? 0.7 : 1,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!creating) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!creating) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 16px 32px rgba(99, 102, 241, 0.3)'
                }
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>
                {creating ? '⏳ Creando proyecto...' : '🚀 Crear Proyecto'}
              </span>

              {/* Shine effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                animation: !creating ? 'shimmer-slow 3s infinite' : 'none'
              }} />
            </button>

            <p style={{
              fontSize: '13px',
              color: 'var(--ulb-text-muted)',
              marginTop: '12px',
              fontWeight: '500'
            }}>
              ✨ Comienza tu viaje como autor hoy mismo
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer-slow {
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
