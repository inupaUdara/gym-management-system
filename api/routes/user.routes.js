import express from 'express';
import {
  
  
  deleteUser,
  getusers,
  signout,
  test,
  updateUser,
  getUserSupplements,
} from '../controllers/user.controller.js';

import { verifyToken } from '../utills/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser );
router.post('/signout', signout);

router.get('/supplements/:id', verifyToken, getUserSupplements)

router.get('/getusers', verifyToken, getusers);



export default router;