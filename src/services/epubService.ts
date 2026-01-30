// Servicio para generar y descargar un ePub desde el proyecto
// Necesita instalar 'jszip' y 'file-saver' (npm i jszip file-saver)

import JSZip from 'jszip'
import { saveAs } from 'file-saver'

interface Chapter {
  title?: string
  content?: string
}

interface Project {
  name: string
  author?: string
  chapters?: Chapter[] | { [key: string]: Chapter }
  pages?: any[]
  metadata?: any
  version?: string
  updatedAt?: string
}

const escapeXml = (str: string): string => {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const sanitizeFileName = (name: string): string => {
  return (name || 'libro').replace(/[^\w\s-áéíóúñ]/g, '').trim().substring(0, 100)
}

export const EpubService = {
  async generateAndDownloadEpub(project: Project): Promise<void> {
    if (!project || !project.name) {
      throw new Error('El proyecto debe tener un nombre válido')
    }

    const zip = new JSZip()

    zip.folder('META-INF')
    zip.folder('OEBPS')

    zip.file('mimetype', 'application/epub+zip')

    zip.file('META-INF/container.xml', 
`<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`)

    // Obtener capítulos de páginas o del objeto chapters
    let chaptersArray: Chapter[] = []
    
    if (project.pages && Array.isArray(project.pages)) {
      chaptersArray = project.pages
        .filter(p => p && p.title && (p.elements || p.content))
        .map(p => ({
          title: p.title || 'Sin título',
          content: p.elements 
            ? p.elements.map((e: any) => e.htmlContent || e.content || '').join('\n')
            : p.content || ''
        }))
    } else if (Array.isArray(project.chapters)) {
      chaptersArray = project.chapters.filter(ch => ch && ch.title)
    } else if (project.chapters && typeof project.chapters === 'object') {
      chaptersArray = Object.values(project.chapters).filter(ch => ch && ch.title)
    }

    // Si no hay capítulos, crear uno por defecto
    if (chaptersArray.length === 0) {
      chaptersArray = [{
        title: 'Introducción',
        content: `<p>Proyecto: ${escapeXml(project.name)}</p>`
      }]
    }

    const uuid = generateUUID()
    let manifestItems = ''
    let spineItems = ''
    let navPoints = ''

    chaptersArray.forEach((chapter, idx) => {
      const chapterNum = idx + 1
      const chapterId = `ch${chapterNum}`
      const fileName = `chapter${chapterNum}.xhtml`

      manifestItems += `    <item id="${chapterId}" href="${fileName}" media-type="application/xhtml+xml"/>\n`
      spineItems += `    <itemref idref="${chapterId}"/>\n`
      navPoints += `    <navPoint id="navPoint-${chapterNum}" playOrder="${chapterNum}">\n`
      navPoints += `      <navLabel><text>${escapeXml(chapter.title || `Capítulo ${chapterNum}`)}</text></navLabel>\n`
      navPoints += `      <content src="${fileName}"/>\n`
      navPoints += `    </navPoint>\n`

      const content = chapter.content || ''
      const xhtmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
  <head>
    <meta charset="UTF-8"/>
    <title>${escapeXml(chapter.title || `Capítulo ${chapterNum}`)}</title>
  </head>
  <body>
    <h1>${escapeXml(chapter.title || `Capítulo ${chapterNum}`)}</h1>
    <div class="chapter-content">
      ${content}
    </div>
  </body>
</html>`

      zip.file(`OEBPS/${fileName}`, xhtmlContent)
    })

    const author = (project.metadata?.authors?.[0] || project.author || 'Autor Desconocido')

    const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="BookId">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${escapeXml(project.name)}</dc:title>
    <dc:creator>${escapeXml(String(author))}</dc:creator>
    <dc:language>${project.metadata?.language || 'es'}</dc:language>
    <dc:date>${new Date().toISOString().split('T')[0]}</dc:date>
    <dc:identifier id="BookId">urn:uuid:${uuid}</dc:identifier>
  </metadata>
  <manifest>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
${manifestItems}  </manifest>
  <spine toc="ncx">
${spineItems}  </spine>
  <guide/>
</package>`

    zip.file('OEBPS/content.opf', contentOpf)

    const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:${uuid}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle>
    <text>${escapeXml(project.name)}</text>
  </docTitle>
  <navMap>
${navPoints}  </navMap>
</ncx>`

    zip.file('OEBPS/toc.ncx', tocNcx)

    const blob = await zip.generateAsync({ type: 'blob' })
    const fileName = `${sanitizeFileName(project.name)}.epub`
    saveAs(blob, fileName)
  }
}