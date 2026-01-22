import {Project} from '../context/ProjectContext'

const DB_NAME = 'ulb-ebook-db'
const STORE_NAME = 'projects'

export class StorageService {
  private static instance: IDBDatabase | null = null

  static async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {this.instance = request.result; resolve()}
      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {keyPath: 'id'})
        }
      }
    })
  }

  static async saveProject(project: Project): Promise<void> {
    if (!this.instance) await this.init()
    return new Promise((resolve, reject) => {
      const tx = this.instance!.transaction(STORE_NAME, 'readwrite')
      const request = tx.objectStore(STORE_NAME).put(project)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }
}