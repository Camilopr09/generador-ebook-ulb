import React from 'react'
import { useProject } from '../context/ProjectContext'
import { CoverImageUploader } from './CoverImageUploader'

export const CoverDesigner: React.FC = () => {
  const { project, updateMetadata } = useProject()
  if (!project) return null

  const { metadata } = project

  return (
    <div className="space-y-6">
      <div className="rounded-lg shadow" style={{ backgroundColor: 'var(--ulb-surface)', padding: '24px' }}>
        <div className="flex items-center gap-2 mb-6">
          <span style={{ fontSize: '24px' }}>🎨</span>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--ulb-ink)' }}>
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
              className="w-full px-4 py-2 border rounded focus:outline-none"
              style={{ borderColor: 'var(--ulb-border)' }}
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
              className="w-full px-4 py-2 border rounded focus:outline-none"
              style={{ borderColor: 'var(--ulb-border)' }}
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
              className="w-full px-4 py-2 border rounded focus:outline-none h-24"
              style={{ borderColor: 'var(--ulb-border)' }}
            />
          </div>
        </div>
      </div>

      {/* Preview de portada */}
      <div className="rounded-lg shadow" style={{ backgroundColor: 'var(--ulb-surface)', padding: '24px' }}>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--ulb-ink)' }}>Vista previa</h3>
        <div className="aspect-video rounded-lg flex flex-col items-center justify-center text-white p-8 text-center" style={{ backgroundColor: 'var(--ulb-primary)' }}>
          <h1 className="text-3xl font-bold mb-2">{metadata.title || 'Tu Título'}</h1>
          <p className="text-lg">{metadata.authors[0] || 'Tu institución'}</p>
        </div>
      </div>

      {/* Cargador de imagen */}
      <CoverImageUploader />
    </div>
  )
}