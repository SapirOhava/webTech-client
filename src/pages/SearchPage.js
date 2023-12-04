import React, { useState } from 'react';
import apiAxios from '../axiosConfig';
import { useSelector } from 'react-redux';
import UserCard from '../components/UserCard';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('user');
  const [results, setResults] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const handleSearch = async () => {
    try {
      const response = await apiAxios.get(
        `/api/${searchType}/search?name=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <div className="input-group mb-3">
        <div className="col-auto">
          <select
            className="form-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="group">Group</option>
          </select>
        </div>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for users and groups"
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <ul className="list-group">
        {results.map((item, index) => (
          <UserCard key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
