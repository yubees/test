
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home';
import Profile from './Profile';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },])  

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
