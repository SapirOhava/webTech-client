import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  let user = useSelector((state) => state.auth.user);
  useEffect(() => {
    console.log('user:', user);
  }, [user]);
  return (
    <div>
      <h1>Welcome to My App</h1>
    </div>
  );
};

export default HomePage;
