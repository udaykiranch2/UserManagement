import { Link , useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/styles.css';

const UserList = ({ users, onEdit, onDelete, onLoadMore, isLoading, hasMore  }) => {
  const navigate = useNavigate();
  const handleEdit = (user) => {
    onEdit(user);
    navigate(`/edit/${user.id}`); 
  };
  return (
    <div>
      <Link to="/user-form">Add User</Link>
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* <td>{user.id}</td> */}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(user)} style={{ marginRight: '5px' }}>
                  Edit
                </button>
                <button className="delete" onClick={() => onDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="load-more"
        onClick={onLoadMore}
        disabled={isLoading || !hasMore}
      >
        {isLoading ? 'Loading...' : hasMore ? 'Load More' : 'No More Users'}
      </button>
    </div>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      company: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasMore: PropTypes.bool.isRequired,
};

export default UserList;
