import { deepStrictEqual } from 'assert'
import { createCipheriv } from 'crypto'
import fs from 'fs'

class FileContainer {
  constructor(init) {
    this.nameFile = init
    if (!fs.existsSync(init))
      fs.writeFileSync(init, JSON.stringify([]))
  }

  async getAll() {
    try {
      const text = await fs.readFile(this.nameFile, 'utf-8')
      const data = JSON.parse(text)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  async getElement(id) {
    try {
      const text = await fs.readFile(this.nameFile, 'utf-8')
      const data = JSON.parse(text)
      return data.filter(e => e.id == id)      
    } catch (e) {
      console.log(e)
    }
  }

  async add(element) {
    try {
      const text = await fs.readFile(this.nameFile, 'utf-8')
      const data = JSON.parse(text)
      element['id'] = this.assignId(data)
      data.push(element)
      await fs.writeFile(this.nameFile, data, null, 2)
      return element
    } catch(e) {
      console.log(e)
    }
  }

  async remove(id) {
    try {
      const text = await fs.readFile(this.nameFile, 'utf-8')
      const data = JSON.parse(text)    
      const index = products.findIndex(e => e.id == id)
      if (index >= 0) {
        data.splice(index, 0)
        await fs.writeFile(this.nameFile, data, null, 2)
        return 1
      }
      else
        return null
    } catch(e) {
      console.log(e)
    }
  }

  async update(id, element) {
    try {
      const text = await fs.readFile(this.nameFile, 'utf-8')
      const data = JSON.parse(text)    

    } catch(e) {
      console.log(e)
    }
    const data = JSON.parse(fs.readFileSync(this.nameFile, 'utf-8'))
    const element = data.filter(e => e.id == id)
  }
}

export default FileContainer