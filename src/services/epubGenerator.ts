import { Project } from '../context/ProjectContext'

export interface EpubGeneratorOptions {
  format: 'epub2' | 'epub3'
  includeNav: boolean
  embedFonts: boolean
}

export const EpubGenerator = {
  generate: async (project: Project, options: EpubGeneratorOptions = { format: 'epub3', includeNav: true, embedFonts: false }): Promise<Blob> => {
    // Pseudo-implementación simplificada
    const opfContent = generateOPF(project, options)
    const tocContent = options.format === 'epub2' ? generateTOCNCX(project) : generateNavXHTML(project)
    const containerContent = generateContainer()

    const blob = new Blob([opfContent, tocContent, containerContent], { type: 'application/epub+zip' })
    return blob
  }
}

const generateOPF = (project: Project, options: EpubGeneratorOptions): string => {
  const { metadata, pages } = project
  const doctype = options.format === 'epub3' ? '<?xml version="1.0" encoding="UTF-8"?>' : '<?xml version="1.0" encoding="utf-8"?>'
  
  return `${doctype}
<package xmlns="http://www.idpf.org/2007/opf" version="${options.format === 'epub3' ? '3.0' : '2.0'}" unique-identifier="uuid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${metadata.title}</dc:title>
    <dc:creator>${metadata.authors.join(', ')}</dc:creator>
    <dc:language>${metadata.language}</dc:language>
    <dc:identifier id="uuid">${project.id}</dc:identifier>
    <dc:date>${metadata.publicationDate}</dc:date>
    <dc:description>${metadata.description}</dc:description>
    ${metadata.isbn ? `<dc:identifier scheme="ISBN">${metadata.isbn}</dc:identifier>` : ''}
    <dc:rights>${metadata.license}</dc:rights>
  </metadata>
  <manifest>
    ${pages.map((p, i) => `<item id="page${i}" href="pages/page${i}.xhtml" media-type="application/xhtml+xml" />`).join('\n    ')}
    ${options.format === 'epub3' && options.includeNav ? '<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav" />' : ''}
  </manifest>
  <spine>${pages.map((_, i) => `<itemref idref="page${i}" />`).join('')}</spine>
</package>`
}

const generateTOCNCX = (project: Project): string => {
  const navPoints = project.pages
    .filter(p => p.hasNumbering || p.type !== 'cover')
    .map((p, i) => `<navPoint id="nav${i}"><navLabel><text>${p.title}</text></navLabel><content src="pages/page${i}.xhtml" /></navPoint>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head><uid>${project.id}</uid></head>
  <docTitle><text>${project.metadata.title}</text></docTitle>
  <navMap>${navPoints}</navMap>
</ncx>`
}

const generateNavXHTML = (project: Project): string => {
  const navItems = project.pages
    .filter(p => p.hasNumbering || p.type !== 'cover')
    .map((p, i) => `<li><a href="pages/page${i}.xhtml">${p.title}</a></li>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
  <head><title>Contenido</title></head>
  <body><nav epub:type="toc"><ol>${navItems}</ol></nav></body>
</html>`
}

const generateContainer = (): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`
}
