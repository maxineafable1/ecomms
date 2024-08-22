import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product-controllers'
import { auth } from '../middlewares/auth'
import { imageUpload } from '../middlewares/image-upload'
import { seller } from '../middlewares/seller'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)

router.post('/', auth, seller, imageUpload, createProduct)
router.delete('/:id', auth, seller, deleteProduct)
router.put('/:id', auth, seller, imageUpload, updateProduct)

export { router as productRouter }