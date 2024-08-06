import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashFollowing() {
  const { currentUser } = useSelector((state) => state.user);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await fetch(`/api/user/${currentUser._id}/following`);
        const data = await res.json();
        if (res.ok) {
          setFollowing(data);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [currentUser._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>Following</h2>
      <ul>
        {following.map((followed) => (
          <li key={followed._id} className='mb-2'>
            <Link to={`/user/${followed._id}`} className='text-blue-500'>
              {followed.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
