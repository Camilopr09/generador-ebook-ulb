import React, { useRef, useState } from 'react'
import { useProject } from '../context/ProjectContext'

export const CoverImageUploader: React.FC = () => {
  const { project, updateCoverImage } = useProject()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(project?.metadata.coverImageUrl || null)
  const [uploading, setUploading] = useState(false)

  if (!project) return null

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida')
      return
    }

    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe exceder 5MB')
      return
    }

    setUploading(true)
    try {
      // Convertir a base64 para almacenamiento local
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target?.result as string
        setPreview(base64String)
        updateCoverImage(base64String)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error subiendo imagen:', error)
      alert('Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    updateCoverImage('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold">Imagen de Portada</h3>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Portada"
              className="max-h-96 mx-auto rounded object-cover"
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Cambiar imagen
              </button>
              <button
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-10-12l6 6m-6-6v12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx={20} cy={20} r={3} stroke="currentColor" strokeWidth={2} />
            </svg>
            <p className="text-gray-600 font-medium">Haz clic para subir una imagen</p>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG hasta 5MB</p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        className="hidden"
      />

      <div className="text-sm text-gray-600 space-y-1">
        <p>💡 <strong>Recomendaciones:</strong></p>
        <ul className="list-disc ml-5">
          <li>Tamaño mínimo: 600x800px</li>
          <li>Relación de aspecto: 3:4 (ancho:alto)</li>
          <li>Formato: PNG o JPG</li>
        </ul>
      </div>
    </div>
  )
}
