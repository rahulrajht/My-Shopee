const path = require('path')
const express= require( 'express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const connectDB = require('./config/db.js')

const productRoutes = require('./routes/productRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')
const cartRoutes = require('./routes/cartRoutes.js')
const wishlistRoutes = require('./routes/wishlistRoutes.js')
dotenv.config()

require('./config/db')

const app = express()

if (process.env['NODE_ENV'] === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())
const corsOptions ={
  origin: "https://http://localhost:8080/",
  methods: "GET,POST"
}
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/wishlist',wishlistRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env['NODE_ENV'] === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env['PORT'] || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
