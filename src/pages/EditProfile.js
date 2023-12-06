import React, { useState } from 'react';
import apiAxios from '../axiosConfig';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../slices/authSlice';
import { formatToYYYYMMDD } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const loggedInUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    username: loggedInUser.username,
    //email: loggedInUser.email,
    birthday: formatToYYYYMMDD(loggedInUser.birthday),
    // password: '',
    profilePicture: null,
  });
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('birthday', formData.birthday);
    //formDataToSend.append('email', formData.email);
    if (formData.profilePicture) {
      formDataToSend.append('profilePicture', formData.profilePicture);
    }

    try {
      const response = await apiAxios.put('/api/user', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          // When sending FormData, you should remove the Content-Type header from
          // your request, allowing Axios to automatically set the correct type (multipart/form-data).
          // Axios will set the correct type based on FormData
        },
      });
      dispatch(setUser(response.data.user));
      navigate('/');
    } catch (error) {
      console.error(error); // handle error
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
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
            value={formData.username}
            onChange={handleChange}
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
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>
        {/* <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div> */}
        {/* <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            name="profilePicture"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="img-thumbnail mt-2"
              style={{ maxWidth: '200px' }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
