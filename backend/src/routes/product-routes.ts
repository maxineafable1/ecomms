import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product-controllers'
import { auth } from '../middlewares/auth'
// import { imageUpload } from '../middlewares/image-upload'
import { seller } from '../middlewares/seller'
import { upload } from '../middlewares/image-upload'

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProduct)

router.post('/', auth, seller, upload.single('file'), createProduct)
router.delete('/:id', auth, seller, deleteProduct)
router.put('/:id', auth, seller, upload.single('file'), updateProduct)

export { router as productRouter }