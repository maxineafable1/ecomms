import express from 'express'
import { deleteUser, getNewAccessToken, login, logout, signup } from '../controllers/user-controllers'
import { auth } from '../middlewares/auth'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.delete('/delete-user', auth, deleteUser)
router.post('/refresh-token', getNewAccessToken)

export { router as userRouter }