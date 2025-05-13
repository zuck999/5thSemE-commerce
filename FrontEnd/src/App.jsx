import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
// import Mainlayout from './components/Mainlayout';



const brousingRouter = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>,
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  }
]);

function App() {

  return (
    <>
      
    <RouterProvider router={brousingRouter}/> 

    </>
    
  )
}

export default App
