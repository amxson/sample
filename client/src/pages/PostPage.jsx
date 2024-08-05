import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

export default function PostPage() {
  const { postSlug } = useParams();
  const currentUser = useSelector((state) => state.user); // Adjust this according to your setup
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    if (post && post.userId) {
      const getUser = async () => {
        try {
          const res = await fetch(`/api/user/${post.userId}`);
          const data = await res.json();
          if (res.ok) {
            setUser(data);
            if (currentUser) {
              setFollowing(data.followers.includes(currentUser._id));
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getUser();
    }
  }, [post, currentUser]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  useEffect(() => {
    if (post && currentUser) {
      setLiked(post.likes.includes(currentUser._id));
    }
  }, [post, currentUser]);

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/post/likePost/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser._id }),
      });
      const updatedPost = await res.json();
      setPost(updatedPost);
      setLiked(!liked);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFollow = async () => {
    try {
      const res = await fetch(`/api/user/follow/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensure cookies are sent if using session-based authentication
      });
      if (res.ok) {
        setFollowing(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      const res = await fetch(`/api/user/unfollow/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensure cookies are sent if using session-based authentication
      });
      if (res.ok) {
        setFollowing(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p>Error loading post</p>
      </div>
    );

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      {user && (
        <div className='flex items-center justify-center mt-5'>
          <p className='text-center'>
            Author: <strong>{user.username}</strong>
          </p>
          {currentUser && user._id !== currentUser._id && (
            <Button
              color={following ? 'gray' : 'blue'}
              className='ml-4'
              onClick={following ? handleUnfollow : handleFollow}
            >
              {following ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      )}
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className='flex items-center'>
        <button onClick={handleLike} className='mr-2'>
          {liked ? 'Unlike' : 'Like'}
        </button>
        <span>{post && post.numberOfLikes} likes</span>
      </div>
      <CommentSection postId={post && post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((recentPost) => (
              <PostCard key={recentPost._id} post={recentPost} />
            ))}
        </div>
      </div>
    </main>
  );
}
