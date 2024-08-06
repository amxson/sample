import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Notification = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchNotificationCounts = async () => {
      try {
        const response = await axios.get('/api/notifications/counts', {
          headers: {
            'Authorization': `Bearer ${currentUser.token}`, // Ensure the token is included
          },
        });
        setUnreadCount(response.data.unreadCount);
      } catch (error) {
        console.error('Error fetching notification counts:', error);
      }
    };

    fetchNotificationCounts();
  }, [currentUser]);

  const handleBellClick = async () => {
    try {
      await axios.post('/api/notifications/mark-as-read', {}, {
        headers: {
          'Authorization': `Bearer ${currentUser.token}`, // Ensure the token is included
        },
      });
      setUnreadCount(0); // Clear unread count
      navigate('/dashboard?tab=notifications');
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Other header content */}
        <div
          className="notification-icon"
          onClick={handleBellClick}
        >
          <span className={`icon ${unreadCount > 0 ? 'glowing-red' : ''}`}>🔔</span>
          {unreadCount > 0 && (
            <div className="notification-counter">
              {unreadCount}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Notification;
