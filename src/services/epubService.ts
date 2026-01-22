import JSZip from 'jszip'
import {saveAs} from 'file-saver'
import {Project} from '../context/ProjectContext'

export class EpubService {
  static async generateEpub(project: Project): Promise<void> {
    const zip = new JSZip()
    zip.file('mimetype', 'application/epub+zip', {compression: 'STORE'})

    const container = `<?xml version="1.0"?><container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>`
    zip.folder('META-INF')!.file('container.xml', container)

    const opf = this.buildOPF(project)
    zip.folder('OEBPS')!.file('content.opf', opf)

    const css = `* {margin: 0; padding: 0;} body {font-family: Georgia, serif; color: #333;} h1 {color: #1e3fb8;}`
    zip.folder('OEBPS')!.file('styles.css', css)

    const cover = `<?xml version="1.0"?><html xmlns="http://www.w3.org/1999/xhtml"><head><title>${project.cover.title}</title></head><body style="background: #1e3fb8; color: white; text-align: center; display: flex; flex-direction: column; justify-content: center; height: 100vh;"><h1>${project.cover.title}</h1><p>${project.cover.subtitle}</p></body></html>`
    zip.folder('OEBPS')!.file('cover.xhtml', cover)

    const items = project.pages.map((_, i) => `<li><a href="page-${i+1}.xhtml">Página ${i+1}</a></li>`).join('')
    const toc = `<?xml version="1.0"?><html xmlns="http://www.w3.org/1999/xhtml"><body><h1>Contenidos</h1><ul>${items}</ul></body></html>`
    zip.folder('OEBPS')!.file('toc.xhtml', toc)

    project.pages.forEach((page, i) => {
      const pageHtml = `<?xml version="1.0"?><html xmlns="http://www.w3.org/1999/xhtml"><body><h1>${page.title}</h1><div>${page.textGeneral || ''}</div></body></html>`
      zip.folder('OEBPS')!.file(`page-${i+1}.xhtml`, pageHtml)
    })

    const blob = await zip.generateAsync({type: 'blob'})
    saveAs(blob, `${project.cover.title}.epub`)
  }

  private static buildOPF(project: Project): string {
    const pages = project.pages.map((_, i) => `<item id="page-${i+1}" href="page-${i+1}.xhtml" media-type="application/xhtml+xml"/>`).join('\n')
    const spine = project.pages.map((_, i) => `<itemref idref="page-${i+1}"/>`).join('\n')

    return `<?xml version="1.0"?><package xmlns="http://www.idpf.org/2007/opf" version="3.0"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>${project.cover.title}</dc:title><dc:creator>${project.cover.authors.join(', ')}</dc:creator><dc:publisher>Universidad Libre de Barranquilla</dc:publisher></metadata><manifest><item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/><item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/><item id="css" href="styles.css" media-type="text/css"/><item id="toc" href="toc.xhtml" media-type="application/xhtml+xml"/>${pages}</manifest><spine toc="ncx"><itemref idref="cover" linear="no"/><itemref idref="toc"/>${spine}</spine></package>`
  }
}