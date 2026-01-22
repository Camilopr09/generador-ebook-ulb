import React, {useState} from 'react'
import {useProject} from '../context/ProjectContext'
import {WysiwygEditor} from './WysiwygEditor'

export const PageDesigner: React.FC = () => {
  const {project, updatePage, deletePage} = useProject()
  const [selectedId, setSelectedId] = useState<string | null>(project.pages[0]?.id || null)
  const page = project.pages.find(p => p.id === selectedId)

  if (!page) return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center border-l-4 border-red-700">
      <p className="text-gray-500 text-lg">📄 No hay páginas creadas</p>
      <p className="text-gray-400 text-sm mt-2">Crea una página desde el panel de controles</p>
    </div>
  )

  return (
    <div className="grid grid-cols-3 gap-6 h-full">
      {/* SIDEBAR - Lista de páginas */}
      <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-red-700 overflow-y-auto">
        <div className="border-b-2 border-gray-200 pb-3 mb-4">
          <h3 className="font-bold text-black text-lg">📄 Páginas ({project.pages.length})</h3>
        </div>
        
        <div className="space-y-2">
          {project.pages.map((p, i) => (
            <div key={p.id} className="flex gap-2">
              <button 
                onClick={() => setSelectedId(p.id)} 
                className={`flex-1 text-left p-3 rounded-lg transition duration-300 font-medium ${
                  selectedId === p.id
                    ? 'bg-gradient-to-r from-red-700 to-red-600 text-white border-l-4 border-black'
                    : 'bg-gray-50 text-black hover:bg-gray-100 border-l-4 border-transparent'
                }`}
              >
                <div className="font-semibold">{i + 1}. {p.title}</div>
                <div className="text-xs opacity-70 mt-1">📸 {p.images.length} | 🎥 {p.videos.length}</div>
              </button>
              <button
                onClick={() => deletePage(p.id)}
                className="bg-red-700 text-white px-3 py-2 rounded hover:bg-red-800 transition font-bold"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL DERECHO - Editor */}
      <div className="col-span-2 space-y-4">
        {/* Título de la página */}
        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-black">
          <label className="block text-sm font-bold text-gray-700 mb-2">Título de la Página</label>
          <input 
            type="text" 
            value={page.title} 
            onChange={(e) => updatePage(page.id, {title: e.target.value})} 
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg font-bold focus:border-red-700 focus:outline-none transition"
            placeholder="Ingresa el título"
          />
        </div>

        {/* Sección de Multimedia */}
        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-red-700">
          <label className="block text-sm font-bold text-gray-700 mb-3">📸 Multimedia</label>
          <div className="grid grid-cols-2 gap-3">
            <label className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg text-center cursor-pointer hover:from-blue-700 hover:to-blue-800 transition font-bold">
              📸 Agregar Imagen
              <input type="file" accept="image/*" className="hidden" />
            </label>
            <label className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg text-center cursor-pointer hover:from-purple-700 hover:to-purple-800 transition font-bold">
              🎥 Agregar Video
              <input type="file" accept="video/*" className="hidden" />
            </label>
          </div>
        </div>

        {/* Editor WYSIWYG */}
        <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-black overflow-y-auto flex-1">
          <label className="block text-sm font-bold text-gray-700 mb-3">✍️ Contenido de Texto</label>
          <WysiwygEditor 
            value={page.textGeneral} 
            onChange={(v) => updatePage(page.id, {textGeneral: v})} 
          />
        </div>
      </div>
    </div>
  )
}
