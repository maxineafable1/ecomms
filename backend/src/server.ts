import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user-routes'
import { productRouter } from './routes/product-routes'
import { cartRouter } from './routes/cart-routes'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

app.listen(PORT, () => console.log(`listening to port ${PORT}`))