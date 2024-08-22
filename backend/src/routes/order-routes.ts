import express from 'express'
import { auth } from '../middlewares/auth'
import { checkout, getOrders, updateOrderStatus } from '../controllers/order-controllers'
import { seller } from '../middlewares/seller'

const router = express.Router()

router.get('/', auth, seller, getOrders)
router.post('/checkout', auth, checkout)
router.put('/update-status/:id', auth, seller, updateOrderStatus)

export { router as orderRouter }