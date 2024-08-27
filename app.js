require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const errorMiddleware = require('./middlewares/error')
const authRoute = require('./routes/auth-route')
const location = require('./routes/auth-location')
const cart = require('./routes/auth-cart')
const Order = require('./routes/auth-order')
const Payment = require('./routes/auth-payment')
const delivery = require('./routes/auth-dlivery')

const app = express()

app.use(cors())
app.use(express.json())

// service
app.use('/auth', authRoute)

//location
app.use('/location', location)

//cart
app.use('/cart', cart)

//Order
app.use('/order', Order)

//Payment
app.use('/payment', Payment)

//Dlivery
app.use('/dlivery', delivery)

// notFound
app.use( notFound )

// error
app.use(errorMiddleware)

let port = process.env.PORT || 8000
app.listen(port, ()=> console.log('Server on Port :', port))