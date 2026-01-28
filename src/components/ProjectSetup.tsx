import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { TemplateService } from '../services/templateService'

export const ProjectSetup: React.FC = () => {
  const { createProject } = useProject()
  const [projectName, setProjectName] = useState('')
  const templates = TemplateService.getAllTemplates()

  const handleCreateProject = (templateId: string) => {
    if (projectName.trim()) {
      createProject(projectName, templateId as any)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Crear nuevo proyecto</h1>
      <input
        type="text"
        placeholder="Nombre del proyecto"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="w-full px-4 py-2 mb-8 border rounded"
      />
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleCreateProject(template.id)}
            className="p-4 border rounded hover:bg-blue-50 text-left"
          >
            <h3 className="font-bold text-lg">{template.name}</h3>
            <p className="text-sm text-gray-600">Plantilla: {template.id}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
