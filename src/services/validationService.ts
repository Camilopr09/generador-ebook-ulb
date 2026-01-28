import { Project } from '../context/ProjectContext'

export interface ValidationIssue {
  level: 'error' | 'warning'
  message: string
  section: string
  fix?: string
}

export const ValidationService = {
  validateProject: (project: Project): ValidationIssue[] => {
    const issues: ValidationIssue[] = []

    // Metadatos
    if (!project.metadata.title) issues.push({ level: 'error', message: 'Título requerido', section: 'Metadatos', fix: 'Ingresa un título' })
    if (!project.metadata.authors.length) issues.push({ level: 'warning', message: 'Sin autor(es)', section: 'Metadatos' })
    if (!project.metadata.language) issues.push({ level: 'error', message: 'Idioma requerido', section: 'Metadatos' })

    // Contenido
    if (project.pages.length < 2) issues.push({ level: 'warning', message: 'Menos de 2 páginas', section: 'Contenido' })
    
    project.pages.forEach(page => {
      if (!page.title) issues.push({ level: 'error', message: `Página sin título (${page.id})`, section: 'Contenido' })
      if (page.elements.length === 0 && page.type === 'chapter') 
        issues.push({ level: 'warning', message: `Capítulo vacío: ${page.title}`, section: 'Contenido' })
    })

    // Assets
    project.assets.forEach(asset => {
      if (!asset.altText) issues.push({ level: 'warning', message: `Imagen sin alt text: ${asset.filename}`, section: 'Assets' })
      if (asset.fileSize > 5000000) issues.push({ level: 'warning', message: `Archivo pesado: ${asset.filename} (${(asset.fileSize / 1024 / 1024).toFixed(2)}MB)`, section: 'Assets' })
    })

    return issues
  },

  getCompatibilityReport: (project: Project): Record<string, string[]> => {
    const report: Record<string, string[]> = {
      'Kindle': ['Compatible', 'MOBI/AZW recomendado'],
      'Apple Books': ['Compatible con EPUB3', 'Fonts embebidas soportadas'],
      'Google Play Books': ['Compatible con EPUB3', 'Validar imágenes'],
      'Kobo': ['Compatible', 'EPUB3 preferido']
    }
    return report
  }
}
