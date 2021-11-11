const multer = require('multer')
const Baskets = require('./containers/baskets.js')
const Products = require('./containers/products.js')

const PATH = './../persistance'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const db = multer({ storage })

const baskets = new Baskets()
const products = new Products()

exports.db = db
exports.baskets = baskets
exports.products = products