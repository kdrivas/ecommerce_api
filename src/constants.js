import Baskets from './dao/basket/DaoBasketFile.js'
import Products from './dao/product/DaoProductMemory.js'

const PATH = './../persistance'

const productPath = './persistance/products.json'
const basketPath = './persistance/baskets.json'

const baskets = new Baskets(basketPath)
const products = new Products(productPath)


export {baskets, products} 