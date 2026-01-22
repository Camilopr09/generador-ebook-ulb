import React from 'react'

export const WysiwygEditor: React.FC<{value: string; onChange: (v: string) => void}> = ({value, onChange}) => {
  return (
    <div className="border rounded bg-white">
      <div className="bg-gray-100 p-2 border-b">
        <button onClick={() => document.execCommand('bold')} className="px-3 py-1 bg-white rounded mr-1 font-bold">B</button>
        <button onClick={() => document.execCommand('italic')} className="px-3 py-1 bg-white rounded mr-1 italic">I</button>
      </div>
      <div contentEditable onInput={(e) => onChange((e.currentTarget as any).innerHTML)} 
        dangerouslySetInnerHTML={{__html: value}} className="p-4 min-h-48 focus:outline-none" />
    </div>
  )
}