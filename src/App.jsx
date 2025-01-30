import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import mockApiCalls from './services/api';
import '../styles/styles.css';

function App() {
  const [allUsers, setAllUsers] = useState([]); // Store all users
  const [users, setUsers] = useState([]); // Current page users
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Users per page
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setIsLoading(true);
        const data = await mockApiCalls.getUsers();
        setAllUsers(data);
        setCurrentPage(1); // Reset to the first page
        setUsers(data.slice(0, pageSize)); // Display first page users
        setHasMore(data.length > pageSize); // Check if more users exist
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  // Handle loading more users (pagination)
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setUsers((prevUsers) => [...prevUsers, ...allUsers.slice(startIndex, endIndex)]);
    setCurrentPage(nextPage);
    setHasMore(allUsers.length > endIndex); // Check if more users exist
  };

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await mockApiCalls.addUser(newUser);
      setAllUsers((prevUsers) => [...prevUsers, addedUser]);
      setUsers((prevUsers) => {
        const nextUsers = [...prevUsers, addedUser];
        return nextUsers.length <= pageSize ? nextUsers : prevUsers; // Update only current page
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const updated = await mockApiCalls.updateUser(updatedUser);
      setAllUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updated.id ? updated : user))
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updated.id ? updated : user))
      );
      // setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    console.log('Deleting user:', userId);
    try {
      await mockApiCalls.deleteUser(userId);
      setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <Router>
      <div id="root">
        <h1>User Management App</h1>
        <Routes>
          <Route
            path="/"
            element={
              <UserList
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onLoadMore={handleLoadMore}
                isLoading={isLoading}
                hasMore={hasMore}
              />
            }
          />
          <Route
            path="/user-form"
            element={
              <UserForm
                // initialUser={selectedUser}
                onSubmit={handleAddUser}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <UserForm
                initialUser={selectedUser}
                onSubmit={handleUpdateUser}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
