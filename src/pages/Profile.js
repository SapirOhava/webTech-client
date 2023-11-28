import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiAxios from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfilePage() {
  let user = useSelector((state) => state.auth.user);
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = () => {
    if (post) {
      setPosts([...posts, post]);
      setPost('');
    }
  };

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
              <div>
                {posts.map((p, index) => (
                  <div key={index} className="card mb-2">
                    <div className="card-body">{p}</div>
                  </div>
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
