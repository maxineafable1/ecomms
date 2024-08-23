import express from 'express'
import { deleteUser, getNewAccessToken, login, logout, setUserAddress, setUserAsSeller, signup, updateUserInfo } from '../controllers/user-controllers'
import { auth } from '../middlewares/auth'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.delete('/delete-user', auth, deleteUser)
router.post('/refresh-token', getNewAccessToken)
router.put('/update-seller', auth, setUserAsSeller)
router.put('/update-info', auth, updateUserInfo)
router.post('/set-address', auth, setUserAddress)

export { router as userRouter }