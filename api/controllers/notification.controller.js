// In your controller, e.g., notification.controller.js
import Notification from '../models/notification.model.js';

export const getUnreadNotifications = async (req, res, next) => {
  try {
    const unreadNotifications = await Notification.find({
      userId: req.user.id,
      read: false,
    }).sort({ createdAt: -1 });
    res.status(200).json(unreadNotifications);
  } catch (error) {
    next(error);
  }
};


export const markNotificationsAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, read: false },
      { $set: { read: true } }
    );
    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

