import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { ExportService } from '../services/exportService'

export const ExportPanel: React.FC = () => {
  const { project } = useProject()
  const [exporting, setExporting] = useState(false)

  if (!project) return null

  const handleExport = async (format: string) => {
    setExporting(true)
    try {
      if (format === 'epub3') await ExportService.exportEPUB(project, 'epub3')
      else if (format === 'epub2') await ExportService.exportEPUB(project, 'epub2')
      else if (format === 'html') await ExportService.exportHTML(project)
      else if (format === 'project') ExportService.exportProject(project)
    } catch (error) {
      console.error('Error exportando:', error)
    }
    setExporting(false)
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Exportar</h2>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleExport('epub3')}
          disabled={exporting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          📕 EPUB 3
        </button>
        <button
          onClick={() => handleExport('epub2')}
          disabled={exporting}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          📗 EPUB 2
        </button>
        <button
          onClick={() => handleExport('html')}
          disabled={exporting}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          🌐 HTML
        </button>
        <button
          onClick={() => handleExport('project')}
          disabled={exporting}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          💾 Proyecto
        </button>
      </div>
    </div>
  )
}
