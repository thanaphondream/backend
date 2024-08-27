const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const cart = require('../controllers/CartAll')

router.post('/carts', cart.cartsSave)

router.get('/carts', authenticate, cart.cartsShow)

router.put('/carts/:id', cart.cartUpdate)

router.delete('/carts/:cartId', cart.cartsdalete)

module.exports = router;