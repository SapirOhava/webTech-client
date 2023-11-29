import React from 'react';

const PostComponent = ({ post }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>{' '}
        {/* Assuming posts have titles */}
        <h6 className="card-subtitle mb-2 text-muted">{post.createdAt}</h6>
        <p className="card-text">{post.content}</p>
        <button className="btn btn-primary btn-sm me-2" onClick={() => {}}>
          Like
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => {}}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostComponent;
