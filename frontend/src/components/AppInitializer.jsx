// AppInitializer.jsx
import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../store/authSlice.js';
import Cookies from 'js-cookie';

const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();

//   useEffect(() => {
//     const token = Cookies.get('authToken');
//     if (token) {
//       dispatch(checkAuth());
//     }
//   }, []);
const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      dispatch(checkAuth()).finally(() => {
        setAuthChecked(true);  // Set authChecked to true when the check is done
      });
    } else {
      setAuthChecked(true);  // If no token, mark as checked
    }
  }, [dispatch]);

  if (!authChecked) {
    return null;  // Or a loading spinner
  }

  return children;
};

export default AppInitializer;