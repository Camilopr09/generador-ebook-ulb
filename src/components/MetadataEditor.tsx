import React from 'react'
import { useProject } from '../context/ProjectContext'

export const MetadataEditor: React.FC = () => {
  const { project, updateMetadata } = useProject()
  if (!project) return null

  const { metadata } = project

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Metadatos</h2>
      
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
        <option>es</option>
        <option>en</option>
        <option>fr</option>
        <option>de</option>
      </select>
      
      <select
        value={metadata.license}
        onChange={(e) => updateMetadata({ license: e.target.value })}
        className="w-full px-4 py-2 border rounded"
      >
        <option>CC-BY-SA</option>
        <option>CC-BY</option>
        <option>CC-BY-NC</option>
        <option>Todos los derechos reservados</option>
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
  )
}
