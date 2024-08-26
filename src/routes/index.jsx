import { createBrowserRouter } from 'react-router-dom';

// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import HomeRoutes from './HomeRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([MainRoutes, LoginRoutes, HomeRoutes], { basename: import.meta.env.VITE_APP_BASE_NAME });

export default router;
