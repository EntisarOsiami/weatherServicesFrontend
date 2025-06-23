import { createBrowserRouter, RouterProvider } from 'react-router';

import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Homepage from '../pages/Homepage';
import ProtectedLayout from '../layout/ProtectedLayout';

function AppRouter() {
  const router = createBrowserRouter([
    {
      index: true,
      element: (
        <ProtectedLayout>
          <Homepage />
        </ProtectedLayout>
      ),
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
