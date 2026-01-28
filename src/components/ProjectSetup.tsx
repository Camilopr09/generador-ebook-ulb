import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { TemplateService } from '../services/templateService'

export const ProjectSetup: React.FC = () => {
  const { createProject } = useProject()
  const [projectName, setProjectName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const templates = TemplateService.getAllTemplates()

  const handleCreateProject = (templateId: string) => {
    if (!projectName.trim()) {
      alert('Por favor ingresa un nombre para el proyecto')
      return
    }
    createProject(projectName, templateId as any)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Crear nuevo proyecto</h1>
          <p className="text-xl text-gray-600">Selecciona una plantilla para comenzar</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && selectedTemplate && handleCreateProject(selectedTemplate)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-8 text-lg"
            autoFocus
          />

          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600">Plantilla: {template.id}</p>
              </button>
            ))}
          </div>
        </div>

        {selectedTemplate && (
          <div className="text-center">
            <button
              onClick={() => handleCreateProject(selectedTemplate)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-lg"
            >
              Crear Proyecto
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
