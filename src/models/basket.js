import mongoose from 'mongoose'

const basketSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: { type: Date, default: Date.now },
})

const basketModel = mongoose.model('Basket', basketSchema)

export default basketModel