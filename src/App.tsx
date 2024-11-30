
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from './Profile';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Email from './pages/Email';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CenterLayout from './pages/components/CenterOutlet';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      element: <CenterLayout />,
      children: [
        {
          path: "/",
          element: <SignUp />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/email",
          element: <Email />,
        },
        {
          path: "/forgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "/resetPassword",
          element: <ResetPassword />,
        }
      ],
    },
  ])
  const id = import.meta.env.VITE_GOOGLE_ID as string


  return (

    <>
      <GoogleOAuthProvider clientId={id}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>

    </>
  )
}

export default App
