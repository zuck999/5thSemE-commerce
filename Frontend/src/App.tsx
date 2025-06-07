import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";
import './index.css';
import Nevbar from "./components/ui/Nevbar";
import { useUserStore } from "./store/useUserStore";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";



import PaymentSuccess from "./pages/paymentSuccess";
import { cn } from "@/lib/utils";
import { Chart } from "./components/ chart";
import { useEffect } from "react";
import { useCartStore } from "./store/useCartStore";


const App: React.FC = () => {

  const { user, checkAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!user) return;

    getCartItems();
  }, [getCartItems, user]);

  console.log(user);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      
      {/* Content */}
      <div className="relative z-50 pt-20 p-[2vw]">

        <BrowserRouter>
          <Nevbar />
          <Routes>
            <Route path='/' element={user ? <HomePage /> : <Navigate to='/login' />} />
            <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
            <Route
              path='/secret-dashboard'
              element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
            />
            <Route path='/category/:category' element={<CategoryPage />} />
            <Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/chart' element={<Chart />} />
          </Routes>
        </BrowserRouter>
      </div>

      <Toaster />
    </div>
  );
};

export default App;