import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
