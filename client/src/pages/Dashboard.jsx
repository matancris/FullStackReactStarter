import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="content">
        <div className="welcome">
          <h1 className="title">Welcome, {user?.name || 'User'}</h1>
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 