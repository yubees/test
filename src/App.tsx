
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home';
import Profile from './Profile';
import SignUp from './pages/Signup';


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
    }
  ])  

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
