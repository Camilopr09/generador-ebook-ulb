export class GeminiService {
  static async generateIntroduction(topic: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`<h2>Introducción</h2><p>Bienvenido a <strong>${topic}</strong></p>`)
      }, 2000)
    })
  }
}