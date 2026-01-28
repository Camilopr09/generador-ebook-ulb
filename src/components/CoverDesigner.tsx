import React from 'react'
import { useProject } from '../context/ProjectContext'
import { CoverImageUploader } from './CoverImageUploader'

export const CoverDesigner: React.FC = () => {
  const { project, updateMetadata } = useProject()
  if (!project) return null

  const { metadata } = project

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Card principal */}
      <div className="apple-card bg-white p-4 sm:p-6" style={{ borderColor: 'var(--ulb-border)' }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">🎨</span>
          <h2 className="text-xl sm:text-2xl font-semibold" style={{ color: 'var(--ulb-ink)' }}>
            Portada
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ulb-ink)' }}>
              Título
            </label>
            <input
              type="text"
              placeholder="Nuevo E-Book"
              value={metadata.title}
              onChange={(e) => updateMetadata({ title: e.target.value })}
              className="apple-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ulb-ink)' }}>
              Autor/Institución
            </label>
            <input
              type="text"
              placeholder="Universidad Libre de Barranquilla"
              value={metadata.authors.join(', ')}
              onChange={(e) => updateMetadata({ authors: e.target.value.split(',').map(a => a.trim()) })}
              className="apple-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--ulb-ink)' }}>
              Descripción
            </label>
            <textarea
              placeholder="Descripción del e-book"
              value={metadata.description}
              onChange={(e) => updateMetadata({ description: e.target.value })}
              className="apple-input h-24 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="apple-card bg-white p-4 sm:p-6" style={{ borderColor: 'var(--ulb-border)' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--ulb-ink)' }}>Vista previa</h3>
        <div className="aspect-video rounded-2xl flex flex-col items-center justify-center text-white p-6 sm:p-8 text-center" style={{ backgroundColor: 'var(--ulb-primary)' }}>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{metadata.title || 'Tu Título'}</h1>
          <p className="text-sm sm:text-lg">{metadata.authors[0] || 'Tu institución'}</p>
        </div>
      </div>

      {/* Uploader */}
      <CoverImageUploader />
    </div>
  )
}