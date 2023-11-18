import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  clearToken,
  setBirthdayModalShown,
  clearBirthdayModalShown,
} from '../slices/authSlice';
import BirthdayModal from './BirthdayModal';

const MyNavbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const [showBirthdayModal, setShowBirthdayModal] = useState(false);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const birthdayModalAlreadyShown = useSelector(
    (state) => state.auth.birthdayModalShown
  );
  const isLoggedIn = !!token;

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearBirthdayModalShown());
  };

  const handleCloseBirthdayModal = () => {
    setShowBirthdayModal(false);
    dispatch(setBirthdayModalShown(true));
  };

  useEffect(() => {
    const checkBirthday = () => {
      if (!user || !user.birthday) {
        return false;
      }

      const birthday = new Date(user.birthday);
      const today = new Date();

      return (
        birthday.getMonth() === today.getMonth() &&
        birthday.getDate() === today.getDate()
      );
    };
    if (!!token && checkBirthday() && !birthdayModalAlreadyShown) {
      setShowBirthdayModal(true);
    }
  }, [token, user, birthdayModalAlreadyShown]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <span className="ms-2">Users</span>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <FontAwesomeIcon icon={faSignInAlt} />
                      <span className="ms-2">Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      <FontAwesomeIcon icon={faSignInAlt} />
                      <span className="ms-2">Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <span className="ms-2 nav-link">Hi {user.username}</span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <span className="ms-2">Logout</span>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <BirthdayModal
        show={showBirthdayModal}
        onClose={handleCloseBirthdayModal}
      />
    </>
  );
};

export default MyNavbar;
