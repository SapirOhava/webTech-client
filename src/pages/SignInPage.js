import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiAxios from '../axiosConfig';

const SignInPage = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    birthday: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setError('');
      const response = await apiAxios.post('/api/user/signup', userDetails);

      if (response.status === 200) {
        console.log('Sign-in successful:', response.data.message);
        navigate('/'); // Redirect to the home page on successful sign-in
      } else {
        console.error('Sign-in failed:', response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Sign-in error:', error.message);
      setError(error.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-3">Sign Up</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={userDetails.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label">
                Birthday
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                name="birthday"
                value={userDetails.birthday}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
