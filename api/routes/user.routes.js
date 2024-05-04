import express from 'express';
import {
  
  
  deleteUser,
  getusers,
  signout,
  test,
  updateUser,
} from '../controllers/user.controller.js';
import { getTotalUsers } from '../controllers/user.controller.js';

import { verifyToken } from '../utills/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId',verifyToken,deleteUser );
router.post('/signout', signout);
router.get('/getusers', verifyToken, getusers);
router.get('/getusers/total', getTotalUsers);


export default router;