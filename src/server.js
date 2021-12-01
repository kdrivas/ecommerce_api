import express from 'express'

import productRouter from './routes/product.js'
import basketRouter from './routes/basket.js'

import { baskets, products } from './constants.js'

const PORT = process.env.PORT || 8080
const app = express()
const administrator = true

app.use(express.static('public'))

app.set('isAdmin', administrator)
app.set('baskets', baskets)
app.set('products', products)

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/api/productos', productRouter)
app.use('/api/carrito', basketRouter)

app.get('/checkAdmin', (req, res) => {
  res.json({'admin': administrator})
})

app.get('*', (req, res) => {
  res.status(404).send({'error': -2, 'description': `Route ${req.originalUrl} with method ${req.method} not implemented`});
});

app.use((error, req, res, next) => {
  res.status(500).json(error)
})

const server = app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`)
})

server.on('error', (error) => {
  console.log(error)
})