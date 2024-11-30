
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from './Profile';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';


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
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    }
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
