const express = require('express')
const router = express.Router()
const locations = require('../controllers/locationAll')
const authenticate = require('../middlewares/authenticate')

router.get('/provinces',  authenticate, locations.provinces)
router.get('/amphures', authenticate, locations.amphures)
router.get('/districts', authenticate, locations.districts)
router.get('/locationid', authenticate, locations.locationID)
router.get('/location/:id', authenticate, locations.locationidshow)

router.post('/locations', locations.locations )

module.exports = router;