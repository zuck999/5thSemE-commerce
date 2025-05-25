import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";
import './index.css';
import Nevbar from "./components/ui/Nevbar"

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main Content */}
        <Nevbar/>
      <div className="relative z-50 pt-20">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default App;