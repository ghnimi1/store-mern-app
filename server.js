require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const connectDB = require('./DB/connectDB')
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.routes')
const usersRouter = require('./routes/user.routes')
const productRouter = require('./routes/product.routes');
const orderRouter = require('./routes/order.routes')
const categoryRouter = require('./routes/category.routes')
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//connect to DB
connectDB()

//routes
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/category', categoryRouter)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
// server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening on port `, PORT);
})