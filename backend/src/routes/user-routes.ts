import express from 'express'
import { 
  deleteUser, 
  getNewAccessToken, 
  getUserInfo, 
  login, 
  logout, 
  setStoreName, 
  setUserAddress, 
  setUserAsSeller, 
  signup, 
  updateUserInfo 
} from '../controllers/user-controllers'
import { auth } from '../middlewares/auth'
import { seller } from '../middlewares/seller'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.delete('/delete-user', auth, deleteUser)
router.post('/refresh-token', getNewAccessToken)
router.put('/update-seller', auth, setUserAsSeller)
router.put('/update-info', auth, updateUserInfo)
router.post('/set-address', auth, setUserAddress)
router.put('/set-store', auth, seller, setStoreName)
router.get('/', auth, getUserInfo)

export { router as userRouter }