import React, {useState} from 'react'
import {useProject} from '../context/ProjectContext'
import {EpubService} from '../services/epubService'

export const MainControls: React.FC = () => {
  const {project, addPage} = useProject()
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    if (project.pages.length === 0) {alert('⚠️ Crea páginas primero'); return}
    setGenerating(true)
    try {
      await EpubService.generateEpub(project)
      alert('✅ E-libro generado y descargado')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border-t-4 border-red-700 p-6 space-y-4">
      {/* Título */}
      <div className="border-b-2 border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-black">⚙️ Controles</h2>
      </div>

      {/* Botón Nueva Página */}
      <button 
        onClick={addPage} 
        className="w-full bg-gradient-to-r from-red-700 to-red-800 text-white py-3 rounded-lg font-bold hover:from-red-800 hover:to-red-900 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
      >
        ➕ Nueva Página
      </button>

      {/* Botón Generar EPUB */}
      <button 
        onClick={handleGenerate} 
        disabled={generating} 
        className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed border border-red-700"
      >
        {generating ? '⏳ Generando...' : '📚 Generar E-Libro EPUB'}
      </button>

      {/* Card de Estadísticas */}
      <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200 p-4 rounded-lg mt-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">📊 Estado del Proyecto</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Páginas:</span>
            <span className="font-bold text-red-700 bg-white px-3 py-1 rounded border border-red-300">{project.pages.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tamaño:</span>
            <span className="font-bold text-black bg-white px-3 py-1 rounded border border-gray-300">
              {(JSON.stringify(project).length / 1024).toFixed(2)} KB
            </span>
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-black text-white p-3 rounded-lg text-xs border-l-4 border-red-700">
        <p><strong>💡 Tip:</strong> Crea múltiples páginas antes de generar el e-libro</p>
      </div>
    </div>
  )
}
