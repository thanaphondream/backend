const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const payment = require('../controllers/payment')

router.post('/payments', payment.PaymentSave)

router.get('/linemenu/:id', authenticate, payment.paymnetmentLine)
router.get('/payment', authenticate, payment.PaymentShowUser)

module.exports = router;