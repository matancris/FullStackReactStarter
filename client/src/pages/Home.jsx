import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="home">
      <div className="content">
        <h1 className="title">Welcome to Our App</h1>
        <p className="description">
          Experience a modern full-stack application with React and Node.js.
          Featuring secure authentication, real-time updates, and a beautiful user interface.
        </p>
        
        <div className="buttons">
          {!isAuthenticated ? (
            <>
              <Link to="/signin" className="button primary">
                Sign In
              </Link>
              <Link to="/signup" className="button secondary">
                Sign Up
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className="button primary">
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 