import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // Navigating back to home page
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="mb-4">Oops, Something Went Wrong!</h1>
          <div className="alert alert-danger" role="alert">
            {errorMessage || 'An unknown error occurred.'}
          </div>
          <button className="btn btn-primary" onClick={handleBackClick}>
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
