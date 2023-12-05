import React, { useState } from 'react';

function EditProfile() {
  const [formData, setFormData] = useState({
    username: '',
    birthday: '',
    email: '',
    // password: '',
    profilePicture: null,
  });
  const [imagePreview, setImagePreview] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add logic to send data to the server
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
        <div className="mb-3">
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
        </div>
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
