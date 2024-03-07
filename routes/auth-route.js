const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authenticate')
const authController = require('../controllers/auth-controller')
const ProductController = require('../controllers/product-controller')
const Restaurants = require("../controllers/RestaurantsId")
const ProductController01 = require('../controllers/product-linkId');
const Payments = require('../controllers/payment')
const UsernamePayment = require('../controllers/UsernamePayment')
const UserProduck = require('../controllers/UserProduck')


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/res', Restaurants.createRestaurants)
router.post('/menutems', ProductController.createMenutems)
router.post('/payment', Payments.Paymentsm);

router.get('/me', authenticate, authController.getme) 
router.get('/getmenutems', authenticate, ProductController.getmenutems) 
router.get('/getproduct/:id', ProductController01.orderdate)
router.get('/user', authenticate,UsernamePayment.userid)
router.get('/purchases', authenticate,UserProduck.userproduck);

router.delete("/delete/:paymentId", UserProduck.deletemenu)
router.delete('/deletemenu/:menutem', ProductController01.deletemenuorder)
module.exports = router
