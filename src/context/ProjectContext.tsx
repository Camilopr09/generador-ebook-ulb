import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Cover {
  title: string
  subtitle: string
  authors: string[]
  description: string
  images: Array<{id: string; url: string}>
}

export interface PageContent {
  id: string
  title: string
  images: Array<{id: string; url: string}>
  videos: Array<{id: string; url: string}>
  textGeneral: string
}

export interface Project {
  id: string
  cover: Cover
  pages: PageContent[]
  updatedAt: string
}

interface ProjectContextType {
  project: Project
  setProject: (p: Project) => void
  updateCover: (c: Partial<Cover>) => void
  addPage: () => void
  updatePage: (id: string, u: Partial<PageContent>) => void
  deletePage: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [project, setProject] = useState<Project>({
    id: `project-${Date.now()}`,
    cover: {
      title: 'Nuevo E-Book',
      subtitle: 'Universidad Libre de Barranquilla',
      authors: [],
      description: '',
      images: []
    },
    pages: [],
    updatedAt: new Date().toISOString()
  })

  const updateCover = (cover: Partial<Cover>) => {
    setProject(p => ({...p, cover: {...p.cover, ...cover}, updatedAt: new Date().toISOString()}))
  }

  const addPage = () => {
    setProject(p => ({
      ...p,
      pages: [...p.pages, {id: `page-${Date.now()}`, title: `Página ${p.pages.length + 1}`, images: [], videos: [], textGeneral: ''}],
      updatedAt: new Date().toISOString()
    }))
  }

  const updatePage = (pageId: string, updates: Partial<PageContent>) => {
    setProject(p => ({
      ...p,
      pages: p.pages.map(pg => pg.id === pageId ? {...pg, ...updates} : pg),
      updatedAt: new Date().toISOString()
    }))
  }

  const deletePage = (pageId: string) => {
    setProject(p => ({
      ...p,
      pages: p.pages.filter(pg => pg.id !== pageId),
      updatedAt: new Date().toISOString()
    }))
  }

  return (
    <ProjectContext.Provider value={{project, setProject, updateCover, addPage, updatePage, deletePage}}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) throw new Error('useProject fuera de provider')
  return context
}