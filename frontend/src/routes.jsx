import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const Home = lazy(() => import('./pages/Home/Home'));
const ENewspaperPage = lazy(() => import('./pages/ENewspaperPage/ENewspaperPage'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const Register = lazy(() => import('./pages/Register/Register'));
const About = lazy(() => import('./pages/About/About'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail/ArticleDetail'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Feed = lazy(() => import('./pages/Feed/Feed'));
const MediaPage = lazy(() => import('./pages/MediaPage/MediaPage'));
const NewspaperDetailPage = lazy(() => import('./pages/NewspaperDetailPage/NewspaperDetailPage'));
import { getAuthToken } from './utils/auth';
// const token = getAuthToken();
// const isAuthenticated = token ? true : false ;
// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       // { path: "auth", element: {if(token) ? redirect('/') : <LoginPage /> } }, // this one is wrongway of writing
//       // { path: "auth", element:  token ? <Redirect to="/" /> : <LoginPage /> }, // Only login is public
//       // { path: "auth", element:  token ? <Navigate to={"/"}/> : <LoginPage /> }, // Only login is public
//       {
//         element:<ProtectedRoute isAuth={!isAuthenticated} redirect={'/'}><Outlet/></ProtectedRoute>,
//         children: [
//           { path: "auth", element: <LoginPage /> },
//         ]
//       },

//       // Protect all other routes
//       {
//         element: <ProtectedRoute isAuth={isAuthenticated} redirect={'/auth'}><Outlet /></ProtectedRoute>,
//         children: [
//           { path: "news/:category", element: <Feed /> },
//           { path: "media", element: <MediaPage /> },
//           { path: "/", element: <Home /> },
//           { path: "about", element: <About /> },
//           { path: "contact", element: <Contact /> },
//           { path: "register", element: <Register /> },
//           { path: "dashboard", element: <Dashboard /> },
//           { path: "articles/:id", element: <ArticleDetail /> },
//         ]
//       }
//     ]
//   }
// ]);


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public Route (Only accessible when logged OUT)
      {
        element: <ProtectedRoute authPage={true} />, // Redirects to "/" if logged in
        children: [{ path: "auth", element: <LoginPage /> }],
      },

      // Protected Routes (Only accessible when logged IN)
      {
        element: <ProtectedRoute authPage={false} />, // Redirects to "/auth" if NOT logged in
        children: [
          { path: "news/:category", element: <Feed /> },
          { path: "media", element: <MediaPage /> },
          { path: "/home", element: <Home /> },
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "articles/:id", element: <ArticleDetail /> },
          { path: "enewspapers", element: <ENewspaperPage /> },
          { path: "newspaper/:newspaperName", element: <NewspaperDetailPage /> },
        ],
      },
    ],
  },
]);
