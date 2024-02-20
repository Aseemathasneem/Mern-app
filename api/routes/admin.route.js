import express from 'express'
import { addUser, adminSignin, deleteUserData, usersList } from '../controllers/admin.controller.js'

const router = express.Router()

router.post('/signin',adminSignin)
router.get('/users',usersList)
router.delete('/delete/:id', deleteUserData);

router.post('/addUser',addUser)

export default router