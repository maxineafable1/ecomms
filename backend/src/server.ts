import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user-routes'
import { productRouter } from './routes/product-routes'
import { cartRouter } from './routes/cart-routes'
import { orderRouter } from './routes/order-routes'
import path from 'path'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT
app.use(express.static('uploads'))

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.listen(PORT, () => console.log(`listening to port ${PORT}`))