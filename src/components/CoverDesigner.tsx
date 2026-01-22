import React from 'react'
import {useProject} from '../context/ProjectContext'

export const CoverDesigner: React.FC = () => {
  const {project, updateCover} = useProject()

  return (
    <div className="bg-white rounded shadow-lg p-6">
      <h2 className="text-2xl font-bold text-ulb-600 mb-4">✏️ Portada</h2>
      <input
        type="text"
        value={project.cover.title}
        onChange={(e) => updateCover({title: e.target.value})}
        className="w-full border rounded px-3 py-2 mb-3"
        placeholder="Título"
      />
      <input
        type="text"
        value={project.cover.subtitle}
        onChange={(e) => updateCover({subtitle: e.target.value})}
        className="w-full border rounded px-3 py-2 mb-3"
        placeholder="Subtítulo"
      />
      <textarea
        value={project.cover.description}
        onChange={(e) => updateCover({description: e.target.value})}
        className="w-full border rounded px-3 py-2 h-20"
        placeholder="Descripción"
      />
    </div>
  )
}