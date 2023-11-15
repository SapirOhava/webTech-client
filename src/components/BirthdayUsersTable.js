import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BirthdayUsersTable() {
  const [users, setUsers] = useState([
    { name: 'Sapir', birthdate: '1992-04-24' },
    { name: 'Or', birthdate: '1990-11-15' },
    // ... other users
  ]);
  const [displayedUsers, setDisplayedUsers] = useState(users);

  const isBirthdayToday = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    return (
      today.getDate() === birthDate.getDate() &&
      today.getMonth() === birthDate.getMonth()
    );
  };

  const handleShowBirthdays = () => {
    const usersWithBirthdayToday = users.filter((user) =>
      isBirthdayToday(user.birthdate)
    );
    setDisplayedUsers(usersWithBirthdayToday);
  };

  const handleShowAll = () => {
    setDisplayedUsers(users);
  };

  return (
    <div>
      <button className="btn btn-primary m-2" onClick={handleShowBirthdays}>
        Show Today's Birthdays
      </button>
      <button className="btn btn-secondary m-2" onClick={handleShowAll}>
        Show All Users
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.birthdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BirthdayUsersTable;
