const express = require('express')
const productRouter = require('./routes/product.js')
const basketRouter = require('./routes/basket.js')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/api/productos', productRouter)
app.use('/api/carrito', basketRouter)

const server = app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`)
})

server.on('error', (error) => {
  console.log(error)
})