import React from 'react'
import { useProject } from '../context/ProjectContext'

export const ThemeBuilder: React.FC = () => {
  const { project, updateTheme } = useProject()
  if (!project) return null

  const { theme } = project

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Tema Visual</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Familia tipográfica</label>
          <select
            value={theme.typography.fontFamily}
            onChange={(e) => updateTheme({ typography: { ...theme.typography, fontFamily: e.target.value } })}
            className="w-full px-3 py-2 border rounded"
          >
            <option>Georgia, serif</option>
            <option>Arial, sans-serif</option>
            <option>Times New Roman, serif</option>
            <option>Verdana, sans-serif</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Tamaño base (px)</label>
          <input
            type="number"
            value={theme.typography.baseFontSize}
            onChange={(e) => updateTheme({ typography: { ...theme.typography, baseFontSize: parseInt(e.target.value) } })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Color texto</label>
          <input
            type="color"
            value={theme.colors.text}
            onChange={(e) => updateTheme({ colors: { ...theme.colors, text: e.target.value } })}
            className="w-full px-3 py-2 border rounded h-10"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Color fondo</label>
          <input
            type="color"
            value={theme.colors.background}
            onChange={(e) => updateTheme({ colors: { ...theme.colors, background: e.target.value } })}
            className="w-full px-3 py-2 border rounded h-10"
          />
        </div>
      </div>
      
      <div className="p-4 rounded" style={{ backgroundColor: theme.colors.background, color: theme.colors.text, fontFamily: theme.typography.fontFamily }}>
        <p className="text-lg">Vista previa del tema</p>
      </div>
    </div>
  )
}
