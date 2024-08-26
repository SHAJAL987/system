import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import HomeLayout from 'layout/HomeLayout';

// render - login
const Home = Loadable(lazy(() => import('pages/home/index')));

// ==============================|| AUTH ROUTING ||============================== //

const HomeRoutes = {
  path: '/',
  element: <HomeLayout />,
  children: [
    {
      path: '/home',
      element: <Home />
    }
  ]
};

export default HomeRoutes;
