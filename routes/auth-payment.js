const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const payment = require('../controllers/payment')
const upload = require('../middlewares/upload')

router.post('/payments', payment.PaymentSave)
router.post('/pay', upload.array("image",6), payment.transfersave)

router.get('/linemenu/:id', authenticate, payment.paymnetmentLine)
router.get('/payment', authenticate, payment.PaymentShowUser)

router.put('/payments/:id', payment.paystatus)

module.exports = router;