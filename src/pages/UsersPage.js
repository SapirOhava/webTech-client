import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
const API_URL = process.env.REACT_APP_API_URL;

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const fetchUsers = async () => {
    try {
      console.log('fetch users: ', token);
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      return res;
    } catch (error) {
      console.error('error with the fetching users:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(token);
    if (token) {
      fetchUsers()
        .then((data) => {
          setUsers(data);
          setDisplayedUsers(data);
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [token]);

  const handleShowBirthdays = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/user/todayBirthday`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const usersWithBirthdayToday = await res.json();
      setDisplayedUsers(usersWithBirthdayToday);
    } catch (error) {
      console.error(
        'error with the fetching users with birthday today :',
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowAll = () => {
    setDisplayedUsers(users);
  };

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <img src="/spinner.gif" alt="Loading..." />
        </div>
      ) : (
        <>
          <button className="btn btn-primary m-2" onClick={handleShowBirthdays}>
            Show Today's Birthdays
          </button>
          <button className="btn btn-secondary m-2" onClick={handleShowAll}>
            Show All Users
          </button>

          {displayedUsers.length === 0 ? (
            <div>No users to display.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>email</th>
                  <th>Birthday</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.birthday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

export default UsersPage;
