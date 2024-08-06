import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button } from 'flowbite-react';

const DashNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      fetch('/api/notifications/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setNotifications(data);
          } else {
            console.error('Expected an array but got:', data);
            setNotifications([]);
          }
        })
        .catch(error => console.error('Error fetching notifications:', error));
    }
  }, [currentUser]);

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {notifications.length > 0 ? (
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Details</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {notifications.map(notification => (
              <Table.Row key={notification._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(notification.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                {notification.type === 'like' ? 'Like' : notification.type === 'comment' ? 'Comment' : 'Follow'}
                </Table.Cell>
                <Table.Cell>
                  `@{notification.actionUserId?.username || 'Unknown user'}`
                  {notification.type === 'like' ? ' liked your post' : notification.type === 'comment' ? ' commented on your post': " started following you"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No notifications available</p>
      )}
    </div>
  );
};

export default DashNotification;
