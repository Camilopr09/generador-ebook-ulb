import { Project } from '../context/ProjectContext'

export const StorageService = {
  init: () => {
    // Inicializar almacenamiento local
    console.log('📦 Storage Service inicializado')
  },

  saveProject: async (project: Project | null): Promise<void> => {
    try {
      if (!project) return
      const serialized = JSON.stringify(project)
      localStorage.setItem(`project_${project.id}`, serialized)
      const projectList = StorageService.getProjectList()
      if (!projectList.includes(project.id)) {
        projectList.push(project.id)
        localStorage.setItem('project_list', JSON.stringify(projectList))
      }
    } catch (error) {
      console.error('Error guardando proyecto:', error)
    }
  },

  loadProject: (projectId: string): Project | null => {
    try {
      const data = localStorage.getItem(`project_${projectId}`)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error cargando proyecto:', error)
      return null
    }
  },

  getProjectList: (): string[] => {
    try {
      const list = localStorage.getItem('project_list')
      return list ? JSON.parse(list) : []
    } catch {
      return []
    }
  },

  deleteProject: (projectId: string): void => {
    try {
      localStorage.removeItem(`project_${projectId}`)
      const projectList = StorageService.getProjectList()
      const filtered = projectList.filter(id => id !== projectId)
      localStorage.setItem('project_list', JSON.stringify(filtered))
    } catch (error) {
      console.error('Error eliminando proyecto:', error)
    }
  }
}