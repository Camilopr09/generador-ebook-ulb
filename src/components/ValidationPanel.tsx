import React from 'react'
import { useProject } from '../context/ProjectContext'
import { ValidationService, ValidationIssue } from '../services/validationService'

export const ValidationPanel: React.FC = () => {
  const { project } = useProject()
  if (!project) return null

  const issues = ValidationService.validateProject(project)
  const compatibility = ValidationService.getCompatibilityReport(project)

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Validación y Compatibilidad</h2>
      
      <div>
        <h3 className="text-lg font-bold mb-4">Problemas detectados ({issues.length})</h3>
        <div className="space-y-2">
          {issues.map((issue, i) => (
            <div key={i} className={`p-3 rounded ${issue.level === 'error' ? 'bg-red-50 border-l-4 border-red-500' : 'bg-yellow-50 border-l-4 border-yellow-500'}`}>
              <p className="font-semibold">{issue.message}</p>
              <p className="text-sm text-gray-600">{issue.section}</p>
              {issue.fix && <p className="text-sm text-green-600 mt-1">💡 {issue.fix}</p>}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-4">Compatibilidad</h3>
        <div className="space-y-2">
          {Object.entries(compatibility).map(([platform, details]) => (
            <div key={platform} className="p-3 border rounded">
              <p className="font-semibold">{platform}</p>
              <ul className="text-sm text-gray-600 list-disc ml-5">
                {details.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
