import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product-controllers'
import { auth } from '../middlewares/auth'
import { imageUpload } from '../middlewares/image-upload'

const router = express.Router()

router.get('/', getProducts)
router.post('/', auth, imageUpload, createProduct)
router.get('/:id', getProduct)
router.delete('/:id', auth, deleteProduct)
router.put('/:id', auth, imageUpload, updateProduct)

export { router as productRouter }