import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${item._id}`);
  };
  return (
    <div
      className="card mb-3 d-flex flex-row align-items-center"
      onClick={handleClick}
    >
      <img
        src={'/tmpProfileImg.jpeg'}
        alt={item.username}
        className="rounded-circle"
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'cover',
          margin: '10px',
        }}
      />
      <div>
        <h5 className="card-title mb-0">{item.username}</h5>
      </div>
    </div>
  );
};

export default UserCard;
