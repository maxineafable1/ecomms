import express from 'express'
import { auth } from '../middlewares/auth'
import { addToCart, deleteCartItem, getCartItems, updateCartItem } from '../controllers/cart-controllers'

const router = express.Router()

router.get('/', auth, getCartItems)
router.post('/:id', auth, addToCart)
router.delete('/:id', auth, deleteCartItem)
router.put('/:id', auth, updateCartItem)

export { router as cartRouter }
