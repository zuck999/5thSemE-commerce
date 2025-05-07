import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
// import Mainlayout from './components/Mainlayout';



const brousingRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
    // children:[
    //   {
    //     path:'/',
    //     element:</>
    //   }
    // ]
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
