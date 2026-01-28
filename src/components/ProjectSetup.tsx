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
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--ulb-bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--ulb-ink)' }}>
            Crear nuevo proyecto
          </h1>
          <div className="flex justify-center mb-4">
            <div style={{ height: '3px', width: '60px', backgroundColor: 'var(--ulb-gold)' }}></div>
          </div>
          <p className="text-xl" style={{ color: 'var(--ulb-text-muted)' }}>
            Selecciona una plantilla para comenzar
          </p>
        </div>

        <div className="rounded-lg shadow p-8 mb-8" style={{ backgroundColor: 'var(--ulb-surface)' }}>
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && selectedTemplate && handleCreateProject(selectedTemplate)}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none mb-8 text-lg"
            style={{ borderColor: 'var(--ulb-border)' }}
            autoFocus
          />

          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-6 border-2 rounded-lg text-left transition-all ${
                  selectedTemplate === template.id ? 'shadow-md' : 'hover:shadow-sm'
                }`}
                style={{
                  borderColor: selectedTemplate === template.id ? 'var(--ulb-primary)' : 'var(--ulb-border)',
                  backgroundColor:
                    selectedTemplate === template.id ? 'rgba(214, 31, 38, 0.05)' : 'var(--ulb-surface)'
                }}
              >
                <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--ulb-ink)' }}>
                  {template.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--ulb-text-muted)' }}>
                  Plantilla: {template.id}
                </p>
                {selectedTemplate === template.id && (
                  <div
                    className="mt-3 text-xs px-2 py-1 rounded w-fit text-white"
                    style={{ backgroundColor: 'var(--ulb-gold)' }}
                  >
                    ✓ Seleccionada
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {selectedTemplate && (
          <div className="text-center">
            <button
              onClick={() => handleCreateProject(selectedTemplate)}
              className="px-8 py-3 text-white rounded-lg font-bold transition hover:shadow-lg"
              style={{ backgroundColor: 'var(--ulb-primary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--ulb-primary)')}
            >
              Crear Proyecto
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
