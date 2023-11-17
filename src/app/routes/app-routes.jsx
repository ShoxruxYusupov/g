import { createBrowserRouter } from 'react-router-dom';
import { UserRoutes } from '../../user/routes';

export const appRoutes = createBrowserRouter(UserRoutes());
