import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import StudentsList from './pages/StudentsList';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import CoursesPage from './pages/CoursesPage';
import DashboardAppPage from './pages/DashboardAppPage';

export default function RouterConfig() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: userInfo ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'app', element: <DashboardAppPage />, index: true },
        { path: 'students', element: <StudentsList /> },
        { path: 'courses', element: <CoursesPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/login',
      element: userInfo ? <Navigate to="/dashboard/app" /> : <LoginPage />,
    },
    {
      path: '/404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" />,
    },
  ]);

  return routes;
}
