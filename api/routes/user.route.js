import  express  from "express";
import { test, updateUser,deleteUser, userData, editUserData } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

 const router = express.Router()
 router.get('/',test)
 router.post('/update/:id',verifyToken,updateUser)
 router.post('/admin/update/:id',editUserData)
 router.delete('/delete/:id', verifyToken, deleteUser);
 router.get('/:id',userData)
 
export default router;