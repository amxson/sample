import express from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
  followUser,      // Add this
  unfollowUser     // Add this
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);
router.get('/:userId', getUser);
router.put('/follow/:userId', verifyToken, followUser);      // Add this
router.put('/unfollow/:userId', verifyToken, unfollowUser);  // Add this

export default router;
