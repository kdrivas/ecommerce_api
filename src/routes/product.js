import { Router } from 'express'
import DaoProduct from '../dao/product/index.js'

const productRouter = Router()

productRouter.get('/', async (req, res) => {
  try {
    const listProducts = await DaoProduct.getAll()
    res.status(200).json({'products': listProducts})
  }
  catch(e) {
    console.log(e)
  }
})

productRouter.get('/:id', async (req, res, err) => {
  try {
    const id = parseInt(req.params.id)
    const product = await DaoProduct.getProduct(id)
    if (product) {
      res.status(200).json({ product })
    }
    else {
      err({'error': `Product not found with id ${id}`})
    }
  }
  catch(e) {
    console.log(e)
  }
})

productRouter.post('/', async (req, res, err) => {
  try {
    const isAdmin = req.app.get('isAdmin')
    if (isAdmin) {
      const { name, description, sku, photo, price, stock } = req.body
      if (name == null || description == null || sku == null || photo == null || price == null || stock == null)
        err({'error': 'Insufficient data'})
      else {
        const product = await DaoProduct.add({ name, description, sku, photo, price, stock })
        res.status(200).json({ product })
      }
    }
    else
      err({'error': -1, 'description': `Route ${req.originalUrl} with method ${req.method} not authorized`})  }
  catch(e) {
    console.log(e)
  }
})

productRouter.put('/:id', async (req, res, err) => {
  try {
    const isAdmin = req.app.get('isAdmin')
    if (isAdmin) {
      const id = parseInt(req.params.id)
      const { name, description, sku, photo, price, stock } = req.body
      const product = await DaoProduct.update(id, { name, description, sku, photo, price, stock })
      if (product)
        res.status(200).json({ product })
      else 
        err({'error': `Product not found with id ${id}`})
    }
    else
      err({'error': -1, 'description': `Route ${req.originalUrl} with method ${req.method} not authorized`})
  }
  catch(e) {
    console.log(e)
  }
})

productRouter.delete('/:id', async (req, res, err) => {
  try {
    const isAdmin = req.app.get('isAdmin')
    if (isAdmin) {
      const id = parseInt(req.params.id)
      const flgRemove = await DaoProduct.remove(id)
      if (flgRemove) 
        res.status(200).json({ 'message': 'Product removed' })
      else 
        err({'error': `Product not found with id ${id}`})
    }
    else
      err({'error': -1, 'description': `Route ${req.originalUrl} with method ${req.method} not authorized`})
  }
  catch(e) {
    console.log(e)
  }
})

export default productRouter