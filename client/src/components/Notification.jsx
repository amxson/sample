import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications/unread');
        setHasUnreadNotifications(response.data.length > 0);
      } catch (error) {
        console.error('Error fetching unread notifications:', error);
      }
    };

    fetchUnreadNotifications();
  }, []);

  const handleBellClick = async () => {
    try {
      await axios.post('/api/notifications/mark-as-read');
      setHasUnreadNotifications(false); // Clear the notification icon's glowing effect
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <header>
      <div className="header-content">
        {/* Other header content */}
        <div className="notification-icon" onClick={handleBellClick}>
          {hasUnreadNotifications ? (
            <span className="icon glowing-red">🔔</span>
          ) : (
            <span className="icon">🔔</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Notification;
