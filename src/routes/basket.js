const { Router } = require('express')

basketRouter = Router()

basketRouter.get('/', async (req, res, err) => {
  const baskets = req.app.get('baskets')
  const allBaskets = await baskets.getAll()
  res.status(200).json({'baskets': allBaskets})
})

basketRouter.post('/', async (req, res, err) => {
  const baskets = req.app.get('baskets')
  const basket = await baskets.createBasket()
  res.status(200).json({ basket })
})

basketRouter.delete('/:id', async (req, res, err) => {
  const baskets = req.app.get('baskets')
  const id = parseInt(req.params.id)
  const flgDelete = await baskets.deleteBasket(id)
  if (flgDelete) 
    res.status(200).json({'message': `Basket removed with id ${id}`})
  else
    err({'error': 'Basket not found'})
})

basketRouter.get('/:id/productos', async (req, res, err) => {
  const baskets = req.app.get('baskets')
  const id = parseInt(req.params.id)
  const products = baskets.getProducts(id)
  if (products)
    res.status(200).send({ products })
  else
    err({'error': 'Basket not found'})
})

basketRouter.post('/:id/productos', async (req, res, err) => {
  try {
    const baskets = req.app.get('baskets')
    const products = await req.app.get('products').getAll()
    const id = parseInt(req.params.id)
    const idProd = parseInt(req.body.id_prod)
    const flgAdded = await baskets.addProductToBasket(id, idProd, products)
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
  const baskets = req.app.get('baskets')
  const basketId = parseInt(req.params.id)
  const productId = parseInt(req.params.idProd)
  const flgDelete = await baskets.deleteProduct(basketId, productId)

  if (flgDelete)
    res.status(200).json({'message': 'Product deleted from basket'})
  else
    err({'error': 'Basket or product not found'})
})

module.exports = basketRouter