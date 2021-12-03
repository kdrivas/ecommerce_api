import MongoContainer from '../../containers/MongoContainer.js';

class DaoBasketMongo extends MongoContainer{
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
      const result = await this.model.updateOne({ _id: id }, { $push: {products: product} })
      return result['matchedCount']
    } catch(e) {
      console.log(e)
    }
  }

  async deleteProduct(id, product) {
    try {
      const result = await this.model.updateOne({ _id: id }, { $pull: {products: product} })
      return result['modifiedCount']
    } catch(e) {
      console.log(e)
    }
  }
}

export default DaoBasketMongo