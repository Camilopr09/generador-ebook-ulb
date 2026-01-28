import { Project, ThemeConfig, Page } from '../context/ProjectContext'

export const TEMPLATES: Record<string, { name: string; theme: ThemeConfig; pages: Page[] }> = {
  novel: {
    name: 'Novela',
    theme: {
      typography: { fontFamily: 'Georgia, serif', baseFontSize: 16, lineHeight: 1.8, headingScale: 1.3 },
      colors: { text: '#1a1a1a', background: '#fefefe', accent: '#8b0000' },
      spacing: { margin: 20, padding: 15, indentation: 36 },
      preset: 'novel'
    },
    pages: [
      { id: '1', type: 'cover', title: 'Portada', order: 0, elements: [], hasNumbering: false },
      { id: '2', type: 'dedication', title: 'Dedicatoria', order: 1, elements: [], hasNumbering: false },
      { id: '3', type: 'prologue', title: 'Prólogo', order: 2, elements: [], hasNumbering: true },
      { id: '4', type: 'chapter', title: 'Capítulo 1', order: 3, elements: [], hasNumbering: true }
    ]
  },
  manual: {
    name: 'Manual Técnico',
    theme: {
      typography: { fontFamily: 'Arial, sans-serif', baseFontSize: 14, lineHeight: 1.6, headingScale: 1.2 },
      colors: { text: '#2c3e50', background: '#ecf0f1', accent: '#3498db' },
      spacing: { margin: 16, padding: 12, indentation: 20 },
      preset: 'technical'
    },
    pages: [
      { id: '1', type: 'cover', title: 'Portada', order: 0, elements: [], hasNumbering: false },
      { id: '2', type: 'acknowledgments', title: 'Contenido', order: 1, elements: [], hasNumbering: false },
      { id: '3', type: 'chapter', title: 'Introducción', order: 2, elements: [], hasNumbering: true }
    ]
  },
  thesis: {
    name: 'Tesis Académica',
    theme: {
      typography: { fontFamily: 'Times New Roman, serif', baseFontSize: 12, lineHeight: 2, headingScale: 1.25 },
      colors: { text: '#000000', background: '#ffffff', accent: '#1f4788' },
      spacing: { margin: 25, padding: 15, indentation: 25 },
      preset: 'academic'
    },
    pages: [
      { id: '1', type: 'cover', title: 'Portada', order: 0, elements: [], hasNumbering: false },
      { id: '2', type: 'acknowledgments', title: 'Agradecimientos', order: 1, elements: [], hasNumbering: false },
      { id: '3', type: 'chapter', title: 'Capítulo 1', order: 2, elements: [], hasNumbering: true }
    ]
  },
  guide: {
    name: 'Guía Práctica',
    theme: {
      typography: { fontFamily: 'Verdana, sans-serif', baseFontSize: 13, lineHeight: 1.5, headingScale: 1.3 },
      colors: { text: '#333333', background: '#f9f9f9', accent: '#27ae60' },
      spacing: { margin: 14, padding: 10, indentation: 18 },
      preset: 'minimal'
    },
    pages: [
      { id: '1', type: 'cover', title: 'Portada', order: 0, elements: [], hasNumbering: false },
      { id: '2', type: 'chapter', title: 'Sección 1', order: 1, elements: [], hasNumbering: true }
    ]
  },
  children: {
    name: 'Cuento Infantil',
    theme: {
      typography: { fontFamily: 'Comic Sans MS, cursive', baseFontSize: 18, lineHeight: 1.9, headingScale: 1.4 },
      colors: { text: '#2c3e50', background: '#fff9e6', accent: '#e74c3c' },
      spacing: { margin: 18, padding: 14, indentation: 28 },
      preset: 'minimal'
    },
    pages: [
      { id: '1', type: 'cover', title: 'Portada', order: 0, elements: [], hasNumbering: false },
      { id: '2', type: 'chapter', title: 'Historia', order: 1, elements: [], hasNumbering: false }
    ]
  },
  comic: {
    name: 'Cómic Ligero',
    theme: {
      typography: { fontFamily: 'Impact, sans-serif', baseFontSize: 14, lineHeight: 1.4, headingScale: 1.5 },
      colors: { text: '#000000', background: '#ffffff', accent: '#f39c12' },
      spacing: { margin: 12, padding: 8, indentation: 16 },
      preset: 'minimal'
    },
    pages: [
      { id: '1', type: 'cover', title: 'Portada', order: 0, elements: [], hasNumbering: false },
      { id: '2', type: 'chapter', title: 'Episodio 1', order: 1, elements: [], hasNumbering: false }
    ]
  }
}

export const TemplateService = {
  getTemplate: (type: string) => TEMPLATES[type] || TEMPLATES.novel,
  getAllTemplates: () => Object.entries(TEMPLATES).map(([key, val]) => ({ id: key, ...val }))
}
