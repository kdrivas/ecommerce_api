const fs = require('fs')
const basketPath = './persistance/baskets.json'

class Baskets {
  constructor() {
    if (! fs.existsSync(basketPath))
      fs.writeFileSync(basketPath, JSON.stringify([]))
  }

  getLastId(baskets) {
    if(baskets.length) {
      return baskets[baskets.length - 1].id + 1
    }
    else {
      return 1
    }
  }

  async getAll() {
    const data = JSON.parse(fs.readFileSync(basketPath, 'utf-8'))
    return data
  }

  async createBasket() {
    const baskets = await this.getAll()
    const id = this.getLastId(baskets)
    const basket = {
      id,
      'timestamp': Date.now(),
      'products': []
    }
    baskets.push(basket)
    fs.writeFileSync(basketPath, JSON.stringify(baskets, null, 2))
    return basket
  }

  async deleteBasket(id) {
    const baskets = await this.getAll()
    const index = baskets.findIndex(e => e.id == id)
    if (index >= 0) {
      baskets.splice(index, 1)
      fs.writeFileSync(basketPath, JSON.stringify(baskets, null, 2))
      return 1
    }
    else {
      return 0
    }
  }

  async getProducts(id) {
    const baskets = await this.getAll()
    const basket = baskets.find(e => e.id == id)
    if (basket) {
      return basket[0].products
    }
    else {
      return null
    }
  }

  async addProductToBasket(id, idProd, products) {
    const baskets = await this.getAll()
    const indexBasket = baskets.findIndex(e => e.id == id)
    if (indexBasket >= 0) {
      const indexProduct = products.findIndex(e => e.id == idProd)
      if (indexProduct >= 0){
        baskets[indexBasket].products.push(products[indexProduct])
        fs.writeFileSync(basketPath, JSON.stringify(baskets, null, 2))
        return 1
      }
      else
        return 0
    }
    else
      return 0
  }

  async deleteProduct(id, idProd) {
    const baskets = await this.getAll()
    const indexBasket = baskets.findIndex(e => e.id == id)
    if (indexBasket >= 0) {
      const indexProduct = baskets[indexBasket].products.findIndex(e => e.id == idProd)
      if (indexProduct >= 0) {
        baskets[indexBasket].products.splice(indexProduct, 1)
        fs.writeFileSync(basketPath, JSON.stringify(baskets, null, 2))
        return 1
      }
      else
        return 0
    }
    else 
      return 0
  }

  async getProducts(id) {
    const baskets = await this.getAll()
    const indexBasket = baskets.findIndex(e => e.id == id)
    if (indexBasket) {
      return baskets[indexBasket].products
    }
    else 
      return null
  }
}

module.exports = Baskets