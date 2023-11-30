import React, { useEffect, useState } from 'react';
import PostComponent from '../components/Post';
import { useSelector } from 'react-redux';
import apiAxios from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfilePage() {
  let user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]); // i need to fetch the users posts
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async (postId) => {
    try {
      const response = await apiAxios.put(
        `/api/post/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post._id === postId ? { ...post, likes: response.data.likes } : post
        )
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handlePostSubmit = async () => {
    try {
      if (post) {
        // setIsLoading(true);
        const response = await apiAxios.post(
          '/api/post',
          {
            post: {
              content: post,
              onModel: 'User',
              associatedWith: user.id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts([...posts, response.data.post]);
        setPost('');
      }
    } catch (error) {
      console.error('error with posting a post:', error);
    } finally {
      //   setIsLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await apiAxios.delete(`/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const fetchUsersPosts = async () => {
    try {
      setIsLoading(true);
      const response = await apiAxios.get('/api/post/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.posts;
    } catch (error) {
      console.error('error with fetching user posts:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersPosts()
      .then((resPosts) => {
        setPosts(resPosts);
      })
      .catch((error) => {
        console.error('error with fetching user posts:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <button className="btn btn-primary">Edit Profile</button>
      <div className="row">
        {/* Profile Header */}
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-body d-flex align-items-center">
              <img
                // src={user.profilePictureURL}
                src="/tmpProfileImg.jpeg" //change it what in the comment after
                alt="Profile"
                className="rounded-circle me-3"
                style={{ maxWidth: '220px', objectFit: 'cover' }}
              />
              <h1 className="card-title">{user.username}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">About Me</h5>
              <p className="card-text">{user.email}</p>
              <p className="card-text">{user.birthday}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body d-flex flex-column align-items-start">
              <h5 className="card-title">Posts</h5>
              <textarea
                className="form-control mb-3"
                placeholder="Write something..."
                value={post}
                onChange={(e) => setPost(e.target.value)}
              ></textarea>
              <button
                className="btn btn-success mb-3"
                onClick={handlePostSubmit}
              >
                Upload Post
              </button>
              <div style={{ width: '100%' }}>
                {posts.map((post) => (
                  <PostComponent
                    key={post._id}
                    post={post}
                    onDelete={handleDelete}
                    onLike={handleLike}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
