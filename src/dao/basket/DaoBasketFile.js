import FileContainer from './../../containers/FileContainer.js';

class DaoBasketFile extends FileContainer{
  constructor(init) {
    super(init)
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

  async addProductToBasket(id, idProd, products) {
    const basket = await this.findById(id)
    if (basket) {
      const indexProduct = products.findIndex(e => e.id == idProd)
      if (indexProduct >= 0){
        basket.products.push(products[indexProduct])
        await this.update(id, basket)
        return 1
      }
      else
        return 0
    }
    else
      return 0
  }

  async deleteProduct(id, idProd) {
    const basket = await this.findById(id)
    if (basket) {
      const indexProduct = basket.products.findIndex(e => e.id == idProd)
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