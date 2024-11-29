
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home';
import Profile from './Profile';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';


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

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
