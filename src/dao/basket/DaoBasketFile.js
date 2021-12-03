import FileContainer from './../../containers/FileContainer.js';

class DaoBasketFile extends FileContainer{
  constructor(init) {
    super(init)
  }

  async findProducts(id, DaoProduct) {
    try {
      const basket = await this.findById(id)
      if (basket) {
        const products = basket.products.map(e => DaoProduct.findById(e))
        return products
      }
      else 
        return null
    } catch(e) {
      console.log(e)
    }
  }

  async createBasket() {
    try {
      const basket = {
        'timestamp': Date.now(),
        'products': []
      }
      const newBasket = await this.add(basket)
      return newBasket
    } catch(e) {
      console.log(e)
    }
  }

  async addProductToBasket(id, product) {
    const basket = await this.findById(id)
    console.log(basket)
    if (basket) {
      basket.products.push(product.id)
      await this.update(id, basket)
      return 1
    }
    else
      return 0
  }

  async deleteProduct(id, idProd) {
    const basket = await this.findById(id)
    if (basket) {
      const indexProduct = basket.products.findIndex(e => e == idProd)
      if (indexProduct >= 0) {
        basket.products.splice(indexProduct, 1)
        await this.update(id, basket)
        return 1
      }
      else
        return 0
    }
    else 
      return 0
  }
}

export default DaoBasketFile