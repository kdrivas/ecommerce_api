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
  const id = parseInt(req.params.id)
  const flgDelete = await DaoBasket.remove(id)
  if (flgDelete) 
    res.status(200).json({'message': `Basket removed with id ${id}`})
  else
    err({'error': 'Basket not found'})
})

basketRouter.get('/:id/productos', async (req, res, err) => {
  const id = parseInt(req.params.id)
  const products = DaoBasket.findById(id)
  if (products)
    res.status(200).send({ products })
  else
    err({'error': 'Basket not found'})
})

basketRouter.post('/:id/productos', async (req, res, err) => {
  try {
    const products = await DaoProduct.getAll()
    const id = parseInt(req.params.id)
    const idProd = parseInt(req.body.id_prod)
    const flgAdded = await DaoBasket.addProductToBasket(id, idProd, products)
    if (flgAdded)
      res.status(200).json({'message': 'Product added to basket'})
    else
      err({'error': 'Basket or product not found'})
  }
  catch (error){
    console.log(error)
  }
})

basketRouter.delete('/:id/productos/:idProd', async (req, res, err) => {
  const basketId = parseInt(req.params.id)
  const productId = parseInt(req.params.idProd)
  const flgDelete = await DaoBasket.deleteProduct(basketId, productId)

  if (flgDelete)
    res.status(200).json({'message': 'Product deleted from basket'})
  else
    err({'error': 'Basket or product not found'})
})

export default basketRouter