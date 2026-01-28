import React from 'react'
import { useProject } from '../context/ProjectContext'
import { useResponsive } from '../hooks/useResponsive'
import { CoverImageUploader } from './CoverImageUploader'

export const CoverDesigner: React.FC = () => {
  const { project, updateMetadata } = useProject()
  const { isMobile } = useResponsive()
  if (!project) return null

  const { metadata } = project

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px' }}>
      {/* Premium Input Card */}
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
          top: -50,
          right: -50,
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: isMobile ? '16px' : '20px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '28px' }}>🎨</span>
          <h2 style={{ 
            fontSize: isMobile ? '18px' : '20px', 
            fontWeight: '700',
            background: 'var(--ulb-primary-gradient)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Diseña tu Portada
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '14px' : '16px', position: 'relative', zIndex: 1 }}>
          {/* Title Input */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: isMobile ? '13px' : '14px', 
              fontWeight: '700', 
              marginBottom: '8px',
              background: 'var(--ulb-primary-gradient)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📖 Título del eBook
            </label>
            <input
              type="text"
              placeholder="Tu Título Espectacular"
              value={metadata.title}
              onChange={(e) => updateMetadata({ title: e.target.value })}
              className="apple-input"
              style={{
                width: '100%',
                padding: isMobile ? '10px 12px' : '12px 14px',
                fontSize: isMobile ? '14px' : '15px',
                border: '2px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
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

          {/* Author Input */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: isMobile ? '13px' : '14px', 
              fontWeight: '700', 
              marginBottom: '8px',
              background: 'var(--ulb-primary-gradient)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ✍️ Autor / Institución
            </label>
            <input
              type="text"
              placeholder="Universidad Libre de Barranquilla"
              value={metadata.authors.join(', ')}
              onChange={(e) => updateMetadata({ authors: e.target.value.split(',').map(a => a.trim()) })}
              className="apple-input"
              style={{
                width: '100%',
                padding: isMobile ? '10px 12px' : '12px 14px',
                fontSize: isMobile ? '14px' : '15px',
                border: '2px solid rgba(236, 72, 153, 0.2)',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.5)',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.5)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(236, 72, 153, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Description Input */}
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: isMobile ? '13px' : '14px', 
              fontWeight: '700', 
              marginBottom: '8px',
              background: 'linear-gradient(90deg, #6366F1, #EC4899)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              ✨ Descripción
            </label>
            <textarea
              placeholder="Describe tu eBook de forma atractiva..."
              value={metadata.description}
              onChange={(e) => updateMetadata({ description: e.target.value })}
              className="apple-input"
              style={{
                width: '100%',
                padding: isMobile ? '10px 12px' : '12px 14px',
                fontSize: isMobile ? '14px' : '15px',
                border: '2px solid rgba(99, 102, 241, 0.15)',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.5)',
                minHeight: isMobile ? '100px' : '120px',
                resize: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.08)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.15)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Premium Preview Card */}
      <div className="apple-card" style={{ 
        padding: isMobile ? '16px 18px' : '20px 24px',
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0.02) 100%)',
        border: '1.5px solid rgba(212, 175, 55, 0.15)'
      }}>
        <h3 style={{ 
          fontSize: isMobile ? '14px' : '15px', 
          fontWeight: '700', 
          marginBottom: '16px',
          background: 'linear-gradient(90deg, #D4AF37, #F4C430)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          👁️ Vista Previa - Portada Premium
        </h3>
        
        <div style={{
          aspectRatio: '16 / 9',
          borderRadius: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: isMobile ? '24px' : '32px',
          background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #EC4899 100%)',
          boxShadow: '0 16px 32px rgba(99, 102, 241, 0.3), 0 0 60px rgba(236, 72, 153, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '-100px',
            left: '-100px',
            pointerEvents: 'none'
          }} />

          <h1 style={{ 
            fontSize: isMobile ? '24px' : '32px', 
            fontWeight: '800', 
            color: 'white', 
            marginBottom: '8px',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}>
            {metadata.title || '📚 Tu Título'}
          </h1>
          
          <p style={{ 
            fontSize: isMobile ? '12px' : '14px', 
            color: 'rgba(255, 255, 255, 0.95)', 
            fontWeight: '600',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}>
            {metadata.authors[0] || 'Universidad Libre de Barranquilla'}
          </p>

          {/* Gold accent line */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            width: '40px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            zIndex: 1
          }} />
        </div>
      </div>

      {/* Uploader */}
      <CoverImageUploader />
    </div>
  )
}