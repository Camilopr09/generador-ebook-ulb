import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Metadata {
  title: string
  subtitle: string
  authors: string[]
  editor: string
  language: string
  isbn: string
  publicationDate: string
  license: string
  description: string
  keywords: string[]
  coverImageUrl?: string
}

export interface ThemeConfig {
  typography: {
    fontFamily: string
    baseFontSize: number
    lineHeight: number
    headingScale: number
  }
  colors: {
    text: string
    background: string
    accent: string
  }
  spacing: {
    margin: number
    padding: number
    indentation: number
  }
  preset: 'minimal' | 'academic' | 'novel' | 'technical'
}

export interface ContentElement {
  id: string
  type: 'h1' | 'h2' | 'h3' | 'p' | 'list' | 'quote' | 'callout' | 'image' | 'table'
  content: string
  htmlContent?: string
  metadata?: Record<string, any>
}

export interface Page {
  id: string
  type: 'chapter' | 'dedication' | 'prologue' | 'acknowledgments' | 'bibliography' | 'glossary' | 'cover'
  title: string
  order: number
  elements: ContentElement[]
  hasNumbering: boolean
}

export interface Project {
  id: string
  name: string
  templateType: 'novel' | 'manual' | 'thesis' | 'guide' | 'children' | 'comic'
  metadata: Metadata
  theme: ThemeConfig
  pages: Page[]
  assets: AssetReference[]
  createdAt: Date
  updatedAt: Date
  version: string
  changelog: ChangelogEntry[]
}

export interface AssetReference {
  id: string
  filename: string
  type: 'image' | 'svg' | 'audio' | 'video'
  url: string
  altText: string
  description?: string
  width?: number
  height?: number
  mimeType: string
  fileSize: number
  compressed: boolean
}

export interface ChangelogEntry {
  version: string
  date: Date
  changes: string[]
  author?: string
}

interface ProjectContextType {
  project: Project | null
  createProject: (name: string, template: Project['templateType']) => void
  updateProject: (updates: Partial<Project>) => void
  addPage: (page: Page) => void
  updatePage: (pageId: string, updates: Partial<Page>) => void
  deletePage: (pageId: string) => void
  updateMetadata: (metadata: Partial<Metadata>) => void
  updateTheme: (theme: Partial<ThemeConfig>) => void
  addAsset: (asset: AssetReference) => void
  removeAsset: (assetId: string) => void
  addChangelog: (changes: string[]) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

const defaultTheme: ThemeConfig = {
  typography: {
    fontFamily: 'Georgia, serif',
    baseFontSize: 16,
    lineHeight: 1.6,
    headingScale: 1.25
  },
  colors: { text: '#000000', background: '#ffffff', accent: '#2563eb' },
  spacing: { margin: 16, padding: 12, indentation: 24 },
  preset: 'novel'
}

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project | null>(null)

  const createProject = (name: string, template: Project['templateType']) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      templateType: template,
      metadata: {
        title: name,
        subtitle: '',
        authors: [],
        editor: '',
        language: 'es',
        isbn: '',
        publicationDate: new Date().toISOString().split('T')[0],
        license: 'CC-BY-SA',
        description: '',
        keywords: []
      },
      theme: defaultTheme,
      pages: [{ id: '0', type: 'cover', title: 'Portada', order: 0, elements: [], hasNumbering: false }],
      assets: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0.0',
      changelog: [{ version: '1.0.0', date: new Date(), changes: ['Proyecto creado'] }]
    }
    setProject(newProject)
  }

  const updateProject = (updates: Partial<Project>) => {
    if (project) {
      setProject({ ...project, ...updates, updatedAt: new Date() })
    }
  }

  const addPage = (page: Page) => {
    if (project) {
      setProject({
        ...project,
        pages: [...project.pages, page],
        updatedAt: new Date()
      })
    }
  }

  const updatePage = (pageId: string, updates: Partial<Page>) => {
    if (project) {
      setProject({
        ...project,
        pages: project.pages.map(p => p.id === pageId ? { ...p, ...updates } : p),
        updatedAt: new Date()
      })
    }
  }

  const deletePage = (pageId: string) => {
    if (project) {
      setProject({
        ...project,
        pages: project.pages.filter(p => p.id !== pageId),
        updatedAt: new Date()
      })
    }
  }

  const updateMetadata = (metadata: Partial<Metadata>) => {
    if (project) {
      setProject({
        ...project,
        metadata: { ...project.metadata, ...metadata },
        updatedAt: new Date()
      })
    }
  }

  const updateTheme = (theme: Partial<ThemeConfig>) => {
    if (project) {
      setProject({
        ...project,
        theme: { ...project.theme, ...theme },
        updatedAt: new Date()
      })
    }
  }

  const addAsset = (asset: AssetReference) => {
    if (project) {
      setProject({
        ...project,
        assets: [...project.assets, asset],
        updatedAt: new Date()
      })
    }
  }

  const removeAsset = (assetId: string) => {
    if (project) {
      setProject({
        ...project,
        assets: project.assets.filter(a => a.id !== assetId),
        updatedAt: new Date()
      })
    }
  }

  const addChangelog = (changes: string[]) => {
    if (project) {
      const [major, minor, patch] = project.version.split('.').map(Number)
      const newVersion = `${major}.${minor}.${patch + 1}`
      setProject({
        ...project,
        version: newVersion,
        changelog: [...project.changelog, { version: newVersion, date: new Date(), changes }],
        updatedAt: new Date()
      })
    }
  }

  return (
    <ProjectContext.Provider value={{
      project,
      createProject,
      updateProject,
      addPage,
      updatePage,
      deletePage,
      updateMetadata,
      updateTheme,
      addAsset,
      removeAsset,
      addChangelog
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) throw new Error('useProject debe usarse dentro de ProjectProvider')
  return context
}