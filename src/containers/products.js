const fs = require('fs')
const productPath = './persistance/products.json'

class Products {
  constructor() {
    if(!fs.existsSync(productPath))
      fs.writeFileSync(productPath, JSON.stringify([]))
  }

  getLastId(products) {
    if(products.length) {
      return products[products.length - 1].id + 1
    }
    else {
      return 1
    }
  }

  async getAll() {
    const data = JSON.parse(fs.readFileSync(productPath, 'utf-8'))
    return data
  }

  async addProduct(name, description, sku, photo, price, stock) {
    const products = await this.getAll()
    console.log(products)
    const product = { 
      'timestamp': Date.now(), 
      name,         // Nombre
      description,  // Descripcion
      sku,   // Codigo
      photo, // Foto
      price, // Precio
      stock
    }
    product['id'] = this.getLastId(products)
    products.push(product)
    fs.writeFileSync(productPath, JSON.stringify(products, null, 2))
    return product
  }

  async getProduct(id) {
    const products = await this.getAll()
    const product = products.filter(e => e.id == id)
    if (product) {
      return product[0]
    }
    else {
      return null
    }
  }

  async modifyProduct(id, name, description, sku, photo, price, stock) {
    const products = await this.getAll()
    const index = products.findIndex(e => e.id == id)
    if (index >= 0) {
      products[index] = {...products[index], ...{name, description, sku, photo, price, stock}}
      fs.writeFileSync(productPath, JSON.stringify(products, null, 2))
      return products[index]
    }
    else {
      return null
    }
  }

  async removeProduct(id) {
    const products = await this.getAll()
    const index = products.findIndex(e => e.id == id)
    if (index >= 0) {
      products.splice(index, 1)
      fs.writeFileSync(productPath, JSON.stringify(products, null, 2))
      return 1
    }
    else {
      return 0
    }
  }
}

module.exports = Products;