import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import SignInPage from './pages/SignInPage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/Profile';
import SearchPage from './pages/SearchPage';

// The error in your code is likely due to the use of useNavigate outside of the context of a Router. The useNavigate hook from React Router must be used within a component that is a child of Router. In your code, the App component itself contains the Router, which means useNavigate is being called at a level where it doesn't have access to the necessary routing context.
function RedirectToError() {
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      navigate('/error');
    }
  }, [errorMessage, navigate]);

  return null; // This component does not render anything
}

function App() {
  return (
    <Router>
      <MyNavbar />
      <RedirectToError /> {/* This component handles the redirection */}
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
