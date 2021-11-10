const { Router } = require('express')

basketRouter = Router()

basketRouter.get('/', async (req, res, err) => {
  res.status(200).json()
})

module.exports = basketRouter