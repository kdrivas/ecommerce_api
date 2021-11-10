class Products {
  constructor(initProducts) {
    this.products = initProducts
  }

  getLastId() {
    if(this.products.length) {
      return this.products[this.products.length - 1].id + 1
    }
    else {
      return 1
    }
  }

  async getAll() {
    return this.products
  }

  async addProduct(name, description, sku, photo, price, stock) {
    const product = { 
      'timestamp': Date.now(), 
      name,         // Nombre
      description,  // Descripcion
      sku,   // Codigo
      photo, // Foto
      price, // Precio
      stock
    }
    product['id'] = this.getLastId()
    this.products.push(product)
    return product
  }

  async getProduct(id) {
    const product = this.products.filter(e => e.id == id)
    if (product) {
      return product[0]
    }
    else {
      return null
    }
  }

  async modifyProduct(id, name, description, sku, photo, price, stock) {
    const index = this.products.findIndex(e => e.id == id)
    if (index >= 0) {
      this.products[index] = {...this.products[index], ...{name, description, sku, photo, price, stock}}
      return product[index]
    }
    else {
      return null
    }
  }

  async removeProduct(id) {
    const index = this.products.findIndex(e => e.id == id)
    if (index >= 0) {
      this.products.split(index, 1)
      return 1
    }
    else {
      return 0
    }
  }
}

module.exports = Products;