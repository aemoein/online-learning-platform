import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch users from localhost:8001 when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8001/users');
      setUsers(response.data); // Assuming the response is an array of user objects
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, users]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>User Management</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {searchResults.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} {/* Adjust based on user data structure */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;