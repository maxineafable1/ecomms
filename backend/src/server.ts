import express from 'express'
import cors from 'cors'
import { userRouter } from './routes/user-routes'
import { productRouter } from './routes/product-routes'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.listen(PORT, () => console.log(`listening to port ${PORT}`))