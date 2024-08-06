import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'; // Import your authentication middleware
import { getUnreadNotifications } from '../controllers/notification.controller.js'; // Import the controller function
import { markNotificationsAsRead } from '../controllers/notification.controller.js';



const router = express.Router();

router.get('/unread', verifyToken, getUnreadNotifications);
router.post('/mark-as-read', verifyToken, markNotificationsAsRead);

export default router;
