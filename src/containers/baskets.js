class Baskets {
  constructor() {
    this.baskets = []
  }

  getLastId() {
    if(this.products.length) {
      return this.products[this.products.length - 1].id + 1
    }
    else {
      return 1
    }
  }

  async createBasket() {
    const id = this.getLastId()
    const basket = {
      id,
      'timestamp': Date.now(),
      'products': []
    }
    this.baskets.push(basket)
    return basket
  }

  async deleteBasket(id) {
    const index = this.baskets.findIndex(e => e.id == id)
    if (index >= 0) {
      this.baskets.splice(index, 1)
      return 1
    }
    else {
      return 0
    }
  }

  async getProducts(id) {
    const basket = this.baskets.find(e => e.id == id)
    if (basket) {
      return basket[0].products
    }
    else {
      return null
    }
  }

  async addProductToBasket(id, product) {
    const basket = this.baskets.filter(e => e.id == id)
    basket.producto.push(product)
  }

  async deleteProduct(id, idProd) {
    const indexBasket = this.baskets.findIndex(e => e.id == id)
    if (indexBasket) {
      const indexProduct = baskets.products.findIndex(e => e.id == idProd)
      if (indexProduct >= 0) {
        this.baskets[indexBasket].products.splice(indexProduct, 1)
        return 1
      }
      else
        return 0
    }
    else 
      return 0
  }
}

module.exports = Basket