import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const PostComponent = ({ post, onDelete, onLike, isOwnProfile }) => {
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
          <span>{post.likes.length} </span>
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>
        {isOwnProfile && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(post._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostComponent;
