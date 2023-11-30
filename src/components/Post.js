import React from 'react';

const PostComponent = ({ post, onDelete, onLike }) => {
  // Format the date
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">
          {formatDate(post.createdAt)}
        </h6>
        <p className="card-text">{post.content}</p>
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={() => onLike(post._id)}
        >
          Like
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(post._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostComponent;
