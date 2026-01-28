import { Project } from '../context/ProjectContext'
import { EpubGenerator } from './epubGenerator'

export const ExportService = {
  exportEPUB: async (project: Project, format: 'epub2' | 'epub3' = 'epub3'): Promise<void> => {
    const blob = await EpubGenerator.generate(project, { format, includeNav: true, embedFonts: false })
    downloadFile(blob, `${project.name}.epub`)
  },

  exportPDF: async (project: Project): Promise<void> => {
    // Requeriría biblioteca como jsPDF o similar
    console.log('PDF export requiere integración adicional')
  },

  exportHTML: async (project: Project): Promise<void> => {
    const html = generateHTMLPreview(project)
    downloadFile(new Blob([html], { type: 'text/html' }), `${project.name}.html`)
  },

  exportProject: (project: Project): void => {
    const json = JSON.stringify(project, null, 2)
    downloadFile(new Blob([json], { type: 'application/json' }), `${project.name}-proyecto.json`)
  },

  exportChapter: (project: Project, pageId: string): void => {
    const page = project.pages.find(p => p.id === pageId)
    if (!page) return
    const html = `<h1>${page.title}</h1>\n${page.elements.map(e => e.htmlContent || e.content).join('\n')}`
    downloadFile(new Blob([html], { type: 'text/html' }), `${page.title}.html`)
  }
}

const generateHTMLPreview = (project: Project): string => {
  const pages = project.pages.map((page, i) => `
    <article>
      <h1>${page.title}</h1>
      ${page.elements.map(e => e.htmlContent || `<p>${e.content}</p>`).join('\n')}
    </article>
  `).join('\n')

  return `<!DOCTYPE html>
<html lang="${project.metadata.language}">
<head>
  <meta charset="UTF-8">
  <title>${project.metadata.title}</title>
  <style>
    body { font-family: ${project.theme.typography.fontFamily}; font-size: ${project.theme.typography.baseFontSize}px; line-height: ${project.theme.typography.lineHeight}; }
    article { page-break-after: always; }
  </style>
</head>
<body>${pages}</body>
</html>`
}

const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
