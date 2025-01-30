const API_URL = 'http://localhost:5000/users';

const mockApiCalls = {
    getUsers: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      },
  addUser: async (user) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Failed to add user');
    }
    return response.json();
  },
  updateUser: async (updatedUser) => {
    const response = await fetch(`${API_URL}/${updatedUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  },

  // Delete a user
  deleteUser: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to delete user');
      }
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  },
};

export default mockApiCalls;
