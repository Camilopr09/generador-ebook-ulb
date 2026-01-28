import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { Page, ContentElement } from '../context/ProjectContext'

export const ContentEditor: React.FC<{ page: Page }> = ({ page }) => {
  const { updatePage } = useProject()
  const [editingElement, setEditingElement] = useState<string | null>(null)

  const addElement = (type: ContentElement['type']) => {
    const newElement: ContentElement = {
      id: Date.now().toString(),
      type,
      content: '',
      htmlContent: ''
    }
    updatePage(page.id, { elements: [...page.elements, newElement] })
  }

  const updateElement = (elementId: string, content: string) => {
    updatePage(page.id, {
      elements: page.elements.map(el =>
        el.id === elementId ? { ...el, content, htmlContent: content } : el
      )
    })
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg">
      <h3 className="text-xl font-bold">{page.title}</h3>
      
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => addElement('h1')} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+ H1</button>
        <button onClick={() => addElement('h2')} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+ H2</button>
        <button onClick={() => addElement('p')} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+ Párrafo</button>
        <button onClick={() => addElement('quote')} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+ Cita</button>
        <button onClick={() => addElement('callout')} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+ Callout</button>
        <button onClick={() => addElement('list')} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">+ Lista</button>
      </div>
      
      <div className="space-y-3">
        {page.elements.map(el => (
          <div key={el.id} className="p-3 border rounded">
            <label className="text-sm font-medium text-gray-600">{el.type.toUpperCase()}</label>
            <textarea
              value={el.content}
              onChange={(e) => updateElement(el.id, e.target.value)}
              className="w-full px-3 py-2 border rounded mt-2 font-mono text-sm"
              rows={3}
              placeholder="Contenido..."
            />
          </div>
        ))}
      </div>
    </div>
  )
}
