import React, { useState } from 'react'
import { useProject } from '../context/ProjectContext'
import { EpubService } from '../services/epubService'

export const DownloadButton: React.FC = () => {
  const { project } = useProject()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadEpub = async () => {
    if (!project) {
      alert('❌ No hay proyecto para descargar')
      return
    }

    if (!project.name || project.name.trim() === '') {
      alert('❌ El proyecto debe tener un nombre')
      return
    }

    setIsDownloading(true)
    try {
      await EpubService.generateAndDownloadEpub(project)
      alert('✅ ePub descargado correctamente')
    } catch (e: any) {
      console.error('Error al descargar:', e)
      alert(`❌ Error: ${e?.message || 'Error al generar el ePub'}`)
    } finally {
      setIsDownloading(false)
    }
  }

  if (!project) return null

  return (
    <button
      onClick={handleDownloadEpub}
      disabled={isDownloading}
      style={{
        padding: '10px 18px',
        fontSize: '14px',
        minWidth: '120px',
        background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
        color: 'white',
        fontWeight: '600',
        opacity: isDownloading ? 0.6 : 1,
        cursor: isDownloading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        border: 'none',
        borderRadius: '8px'
      }}
      title="Descargar proyecto como ePub"
    >
      {isDownloading ? 'Descargando...' : '⬇️ Descargar ePub'}
    </button>
  )
}
