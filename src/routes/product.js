const { Router } = require('express')
const Products = require('./../containers/products.js')

productRouter = Router()
products = new Products([])

productRouter.get('/', async (req, res) => {
  const listProducts = products.getAll()
  res.status(200).json({'products': listProducts})
})

productRouter.get('/:id', async (req, res, err) => {
  const id = parseInt(req.params.id)
  const product = await products.getProduct(id)
  if (product) {
    res.status(200).json({ product })
  }
  else {
    err(`Product not found with id ${id}`)
  }
})

productRouter.post('/', async (req, res, err) => {
  const { title, thumbnail , price} = req.body
  if (title == '' || thumbnail == '' || price == ''){
    err('Insufficient data')
  }
  else {
    const product = await products.addProduc(title, thumbnail, price)
    res.status(200).json({ product })
  }
})

productRouter.put('/:id', async (req, res, err) => {
  const id = parseInt(req.params.id)
  const { title, thumbnail , price} = req.body
  const product = await products.modifyProduct(id, title, thumbnail, price)
  if (product){
    res.status(200).json({ product })
  }
  else {
    err(`Product not found with id ${id}`)
  }
})

productRouter.delete('/:id', async (req, res, err) => {
  const id = parseInt(req.params.id)
  const flgRemove = products.removeProduct(id)
  if (flgRemove) {
    res.status(200).json({ 'message': 'Product removed' })
  }
  else {
    err(`Product not found with id ${id}`)
  }
})

module.exports = productRouter