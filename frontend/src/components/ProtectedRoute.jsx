import React ,{useState,useEffect }from 'react';
import { Navigate ,Outlet ,useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthToken } from '../utils/auth';
import axios from 'axios'
import Cookies from "js-cookie";

// const ProtectedRoute = ({ children,isAuth,redirect='/auth' }) => {
//   // const isAuthenticated = useSelector((state) => state.auth.token); // Adjust based on your auth state

//   if (!isAuth) {
//     return <Navigate to={redirect} />;
//   }

//   return children ;
//   // return children || <Outlet/>;
// };

// export default ProtectedRoute;


// function ProtectRoute({children, user, redirect='/login'}) {
//   if (!user) {
//     return <Navigate to={redirect} />
//   }
//   return children || <Outlet />
// }




// export const ProtectedRoute = ({ children, redirectPath = '/auth' }) => {
//   const { token } = getAuthToken();
//   // const { token } = useSelector((state) => state.auth); // Get fresh token from Redux

//   // If route requires auth and no token, redirect to login
//   if (!token) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children || <Outlet />;
// };

// export const UnprotectedRoute = ({ children, redirectPath = '/' }) => {
//   const { token } = getAuthToken();
//   // const { token } = useSelector((state) => state.auth);

//   // If user is logged in, redirect away from auth pages
//   if (token) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children || <Outlet />;
// };






const ProtectedRoute = ({ authPage = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/auth/check-auth",{ withCredentials: true })
  //     .then(() => setIsAuthenticated(true))
  //     .catch(() => setIsAuthenticated(false));
  // }, []);


  useEffect(() => {
    const authFunc = () => {
      axios.get("http://localhost:4000/api/auth/check-auth", { withCredentials: true })
        .then((response) => {
          console.log("Response data: in header by calling checkAuth", response.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log("User is not authenticated. Setting isAuthenticated to false.");
            setIsAuthenticated(false);
          } else {
            console.error("Auth check failed:", error);
          }
        });
    };
  
    authFunc(); // Call on mount
  
  }, []);
  if (isAuthenticated === null) return <div>Loading...</div>; // Show a loading state while checking auth

  if (authPage && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!authPage && !isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};


export default ProtectedRoute;

// const ProtectedRoute = ({ authPage = false, redirectPath = "/" }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/api/auth/check-auth", { withCredentials: true })
//       .then(() => setIsAuthenticated(true))
//       .catch(() => setIsAuthenticated(false));
//   }, []);

//   if (isAuthenticated === null) return <div>Loading...</div>;

//   // Redirect logged-in users away from the login page
//   if (authPage && isAuthenticated) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   // Redirect non-authenticated users away from protected pages
//   if (!authPage && !isAuthenticated) {
//     return <Navigate to="/auth" state={{ from: location }} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;

//   return <Outlet />;
// };

// export default ProtectedRoute;