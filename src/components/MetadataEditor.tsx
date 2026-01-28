import React from 'react'
import { useProject } from '../context/ProjectContext'
import { CoverImageUploader } from './CoverImageUploader'

export const MetadataEditor: React.FC = () => {
  const { project, updateMetadata } = useProject()
  if (!project) return null

  const { metadata } = project

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Metadatos</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={metadata.title}
            onChange={(e) => updateMetadata({ title: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          
          <input
            type="text"
            placeholder="Subtítulo"
            value={metadata.subtitle}
            onChange={(e) => updateMetadata({ subtitle: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          
          <textarea
            placeholder="Autores (separados por coma)"
            value={metadata.authors.join(', ')}
            onChange={(e) => updateMetadata({ authors: e.target.value.split(',').map(a => a.trim()) })}
            className="w-full px-4 py-2 border rounded"
          />
          
          <input
            type="text"
            placeholder="Editor"
            value={metadata.editor}
            onChange={(e) => updateMetadata({ editor: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          
          <input
            type="text"
            placeholder="ISBN"
            value={metadata.isbn}
            onChange={(e) => updateMetadata({ isbn: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          
          <select
            value={metadata.language}
            onChange={(e) => updateMetadata({ language: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="pt">Português</option>
          </select>
          
          <select
            value={metadata.license}
            onChange={(e) => updateMetadata({ license: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="CC-BY-SA">CC-BY-SA</option>
            <option value="CC-BY">CC-BY</option>
            <option value="CC-BY-NC">CC-BY-NC</option>
            <option value="Todos los derechos reservados">Todos los derechos reservados</option>
          </select>
          
          <textarea
            placeholder="Descripción"
            value={metadata.description}
            onChange={(e) => updateMetadata({ description: e.target.value })}
            className="w-full px-4 py-2 border rounded h-24"
          />
          
          <textarea
            placeholder="Keywords (separadas por coma)"
            value={metadata.keywords.join(', ')}
            onChange={(e) => updateMetadata({ keywords: e.target.value.split(',').map(k => k.trim()) })}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      </div>

      <CoverImageUploader />
    </div>
  )
}
