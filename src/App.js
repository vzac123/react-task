import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Posts from './pages/Posts';
import DetailsPage from './pages/DetailsPage';
import SignUp from './pages/SignUp';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function App() {
  const authStatus = useSelector((state) => state.user.authStatus);

  const ProtectedRoute = ({ children }) => {
    if (!authStatus) {
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <div className='App font-poppins bg-[#080d0d] h-[100vh]'>
      <Router>
        <div className='App'>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/posts'
              element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              }
            />
            <Route
              path='/posts/:postID'
              element={
                <ProtectedRoute>
                  <DetailsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
