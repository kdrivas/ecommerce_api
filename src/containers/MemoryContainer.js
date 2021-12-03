class MemoryContainer {
  constructor(init) {
    this.data = []
  }

  assignId() {
    if (this.data.length)
      return Math.max(...this.data.map(e => e.id)) + 1
    else
      return 1
  }

  async getAll() {
    try {
      return this.data
    } catch (e) {
      console.log(e)
    }
  }

  async add(element) {
    try {
      element['id'] = this.assignId()
      this.data.push(element)
      return element
    } catch(e) {
      console.log(e)
    }
  }

  async remove(id) {
    try {
      const index = this.data.findIndex(e => e.id == id)
      if (index >= 0) {
        console.log(index)
        this.data.splice(index, 1)
        return 1
      }
      else
        return 0
    } catch(e) {
      console.log(e)
    }
  }

  async update(id, element) {
    try {
      const index = this.data.findIndex(e => e.id == id)
      if (index >= 0){
        this.data[index] = {...this.data[index], ...element}
        return 1
      }
      else
        return 0
    } catch(e) {
      console.log(e)
    }
  }

  async findById(id){
    try {
      const index = this.data.findIndex(e => e.id == id)
      if (index >= 0){
        return this.data[index]
      }
      else
        return null
    } catch(e) {
      console.log(e)
    }
  }
}

export default MemoryContainer