import { Router } from 'express'
import DaoBasket from '../dao/basket/index.js'
import DaoProduct from '../dao/product/index.js'

const basketRouter = Router()

basketRouter.get('/', async (req, res, err) => {
  try {
    const allBaskets = await DaoBasket.getAll()
    res.status(200).json({'baskets': allBaskets})
  } catch(e) {
    console.log(e)
  }
})

basketRouter.post('/', async (req, res, err) => {
  try {
    const basket = await DaoBasket.createBasket()
    res.status(200).json({ basket })
  } catch(e) {
    console.log(e)
  }
})

basketRouter.delete('/:id', async (req, res, err) => {
  try {
    const { id } = req.params
    const flgDelete = await DaoBasket.remove(id)
    if (flgDelete) 
      res.status(200).json({'message': `Basket successfully removed`})
    else
      err({'error': 'Basket not found'})
  } catch(e) {
    console.log(e)
  }
})

basketRouter.get('/:id/productos', async (req, res, err) => {
  try {
    const { id } = req.params
    console.log('GET')
    const products = await DaoBasket.findProducts(id, DaoProduct)
    if (products)
      res.status(200).send({ products })
    else
      err({'error': 'Basket not found'})
  } catch(e) {
    console.log(e)
  }
})

basketRouter.post('/:id/productos', async (req, res, err) => {
  try {
    const { id } = req.params
    const { id_prod } = req.body

    const product = await DaoProduct.findById(id_prod)
    console.log('POST', product)
    let flgAdded
    if (product) {
      flgAdded = await DaoBasket.addProductToBasket(id, product)
    }
    if (flgAdded)
      res.status(200).json({'message': 'Product added to basket'})
    else
      err({'error': 'Basket or product not found'})
  }
  catch (error){
    console.log(error)
  }
})

basketRouter.delete('/:id/productos/:id_prod', async (req, res, err) => {
  const { id, id_prod } = req.params
  const flgDelete = await DaoBasket.deleteProduct(id, id_prod)

  if (flgDelete)
    res.status(200).json({'message': 'Product deleted from basket'})
  else
    err({'error': 'Basket or product not found'})
})

export default basketRouter