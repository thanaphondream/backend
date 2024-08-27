const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const Order = require('../controllers/Order')

router.post('/orders', Order.orders)
router.post('/ordercart', Order.ordercarts)

router.get('/orderofficer', authenticate, Order.orderOfficer)

router.put('/orderUpstatus/:id', Order.OrderUpdateStatus)
router.put('/order/:id', Order.orderupdetestatu)



module.exports = router;