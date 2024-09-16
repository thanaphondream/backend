const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const dlivery = require('../controllers/Delivery')
const upload = require('../middlewares/upload')

router.post('/dliverys', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'imgpay', maxCount: 1 }
]), dlivery.Dliverysave);

router.post('/cancel', dlivery.CancalSave)

module.exports = router;