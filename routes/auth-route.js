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
const Cart = require('../controllers/CartAll')
const reviews = require('../controllers/Reviews')
const profile = require('../controllers/profile')
// const Graph = require('../controllers/graph')
const upload = require('../middlewares/upload')


router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/res', Restaurants.createRestaurants)
router.post('/menutems', upload.array("image",3),ProductController.createMenutems)
// router.post('/payment', Payments.Paymentsm)
// router.post('/cart/add', authenticate,Cart.Carts); 
// router.post('/create-payment', Payments.createPayment)
// router.post('/create-queue', Payments.createQueue);
// router.post('/charge-customer', Payments.chargeCustomer);
router.post('/reviews', reviews.requires)
router.post('/profile', profile.profilePost)

router.get('/me', authenticate, authController.getme) 
router.get('/getmenutems', ProductController.getmenutems) 
router.get('/getproduct/:id', ProductController01.orderdate)
router.get('/user', authenticate,UsernamePayment.userid)
// router.get('/purchases', authenticate,UserProduck.userproduck)
// router.get('/cartorder', authenticate, Cart.CartOrder)
// router.get('/data', authenticate, Payments.graph)
router.get('/profileuser', authenticate, profile.userId)
router.get('/reviewproduct/:id', authenticate, reviews.reviewsproduct)
router.get('/usershowall',authenticate, ProductController.showall)

// router.delete("/delete/:paymentId", UserProduck.deletemenu)
// router.delete('/deletemenu/:menutem', ProductController01.deletemenuorder)
// router.delete('/cartdelete/:basket', Cart.Cartdelete)

router.put('/munus/:id',upload.array("file",4), ProductController.getmenutemsupdate)
router.put('/profileupdate/:id',upload.array("image",1), profile.profileUpdate)
router.put('/profileupdatebg/:id',upload.array("image",2), profile.profileUpdateimabg)
router.put('/updaterole/:id', ProductController.updaterole)
router.put('/monusstatus/:id', ProductController.statusedit)


module.exports = router
