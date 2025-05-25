import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";
import './index.css';
import Nevbar from "./components/ui/Nevbar"
import { useUserStore } from "./store/useCartStore";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";


const App: React.FC = () => {
  	const { user } = useUserStore();
console.log(user);
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-50 pt-20 p-[2vw]">
        <BrowserRouter>
        <Nevbar/>
          <Routes>
					<Route path='/' element={user ? <HomePage /> : <Navigate to='/login' />} />
					<Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />} />
					<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          <Route
						path='/secret-dashboard'
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
					/>
          <Route path='/category/:category' element={<CategoryPage />} />

          </Routes>
        </BrowserRouter>
      </div>
      <Toaster />
    </div>
  );
};

export default App;



