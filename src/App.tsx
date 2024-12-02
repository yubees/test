
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Home from './pages/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Email from './pages/Email';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CenterLayout from './pages/components/CenterOutlet';
import AdminPanel from './pages/AdminPanel';
import WritePost from './pages/WritePost';
import BlogLayout from './pages/components/BlogOutlet';
import Post from './pages/Post';
import UserBlog from './pages/UserBlog';
import Profile from './pages/Profile';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:userName",
      element: (
        <AdminPanel />
      ),
    },
    {
      path: "/profile",
      element: (
        <Profile />
      ),
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
        },
      ],
    },
    {
      element: <BlogLayout />,
      children: [
        {
          path: "/post",
          element: <Post />,
        },
        {
          path: "/posts/:userName",
          element: (
            <UserBlog />
          ),
        },
        {
          path: "/write",
          element: <WritePost />,
        },
  
      ]
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
