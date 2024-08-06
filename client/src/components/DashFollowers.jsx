import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashFollowers() {
  const { currentUser } = useSelector((state) => state.user);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser._id}/followers`);
        const data = await res.json();
        if (res.ok) {
          setFollowers(data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [currentUser._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Your Followers</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower._id} className='mb-2'>
            <Link to={`/user/${follower._id}`} className='text-blue-500'>
              {follower.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
