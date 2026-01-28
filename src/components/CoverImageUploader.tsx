import React, { useRef, useState } from 'react'
import { useProject } from '../context/ProjectContext'

export const CoverImageUploader: React.FC = () => {
  const { project, updateMetadata } = useProject()
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
        updateMetadata({ coverImageUrl: base64String })
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
    updateMetadata({ coverImageUrl: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-4 p-6 rounded-lg shadow" style={{ backgroundColor: 'var(--ulb-surface)' }}>
      <h3 className="text-lg font-bold" style={{ color: 'var(--ulb-ink)' }}>
        Imagen de Portada
      </h3>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition" style={{ borderColor: 'var(--ulb-border)' }}>
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
                className="px-4 py-2 text-white rounded hover:shadow-lg text-sm font-medium transition"
                style={{ backgroundColor: 'var(--ulb-primary)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--ulb-primary)'}
              >
                Cambiar imagen
              </button>
              <button
                onClick={handleRemoveImage}
                className="px-4 py-2 text-white rounded hover:shadow-lg text-sm font-medium transition"
                style={{ backgroundColor: 'var(--ulb-error)' }}
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
            <p className="text-lg font-medium" style={{ color: 'var(--ulb-text-muted)' }}>
              Haz clic para subir una imagen
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--ulb-text-muted)' }}>
              PNG, JPG hasta 5MB
            </p>
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

      <div className="text-sm space-y-1" style={{ color: 'var(--ulb-text-muted)' }}>
        <p><strong>💡 Recomendaciones:</strong></p>
        <ul className="list-disc ml-5">
          <li>Tamaño mínimo: 600x800px</li>
          <li>Relación de aspecto: 3:4 (ancho:alto)</li>
          <li>Formato: PNG o JPG</li>
        </ul>
      </div>
    </div>
  )
}
