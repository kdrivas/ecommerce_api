import FirebaseContainer from "../../containers/FirebaseContainer.js";
import admin from 'firebase-admin'

class DaoBasketFirebase extends FirebaseContainer{
  constructor(init, model) {
    super(init, model)
  }

  async findProducts(id, DaoProduct) {
    try {
      const basket = await this.findById(id)
      if (basket) {
        const products = await Promise.all(basket.products.map(e => DaoProduct.findById(e)))
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
    try {
      const result = await this.addSubObject(id, product)
      return result
    } catch(e) {
      console.log(e)
    }
  }

  async deleteProduct(id, idProd) {
    try {
      const result = await this.removeSubObject(id, idProd)
      return result
    } catch(e) {
      console.log(e)
    }
  }
}

export default DaoBasketFirebase