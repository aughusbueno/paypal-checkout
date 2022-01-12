const cors = require('cors')
const express = require('express')
const order = require('./create-order')
const products = require('./product-list')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/cart', products.cart)

app.get('/paypalClient', (req, res) => {
    const paypalClientId = process.env.CLIENT_ID

    res.send({paypalClientId})
})

app.post('/order', order.PaypalOrder)

const PORT =  3001 || process.env.PORT

app.listen(PORT, () => console.log('server running at port : '+PORT))