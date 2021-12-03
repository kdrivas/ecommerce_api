import mongoose from 'mongoose'

const productShema = new mongoose.Schema({
  name: { type: String }, 
  description: { type: String }, 
  sku: { type: String }, 
  photo: { type: String }, 
  price: { type: Number, min: 0 }, 
  stock: { type: Number, min: 0 } 
})

const productModel = mongoose.model('Product', productShema)

export default productModel