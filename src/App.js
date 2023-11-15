import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import BirthdayUsersTable from './components/BirthdayUsersTable';

function App() {
  return (
    <div className="">
      <MyNavbar />
      <BirthdayUsersTable />
    </div>
  );
}

export default App;
