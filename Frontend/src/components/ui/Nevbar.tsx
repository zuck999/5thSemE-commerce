
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "../../store/useUserStore";
import { ShoppingCart, LogOut, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const { logout , user} = useUserStore();
  const navigate = useNavigate();
	const isAdmin = user?.role === "admin";
  	const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-opacity-90 backdrop-blur-[6px] shadow-lg z-40 transition-all duration-300 border-b border-zinc-800">
      <div className="container mx-auto px-4 py-3">
      <div className={`flex flex-wrap items-center ${user ? "justify-between " : "justify-center "}`}>
				<Link to="/" className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-2 text-2xl font-bold text-transparent sm:text-1xl">
					E-commerce
				</Link>

          <nav className="flex flex-wrap items-center gap-4">
            {user&&<Link
              to="/"
              className="text-gray-300 hover:text-amber-50 transition duration-300 ease-in-out"
            >
              Home
            </Link>}

						{isAdmin && (
							<Link
								className='bg- hover:b-amber-50 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center'
								to={"/secret-dashboard"}
							>
								<Lock className='inline-block mr-1 text-white' size={18} />
								<span className='hidden sm:inline'>Admin-panel</span>
							</Link>
						)}

            <Link
              to="/cart"
              className="relative group text-gray-300 hover:text-amber-50 transition duration-300 ease-in-out"
            >

            { user && 
            <div>
              <ShoppingCart className="inline-block mr-1 group-hover:text-amber-50" size={20} />
              <span className="hidden sm:inline">Cart</span>
              								{cart.length > 0 && (
									<span
										className='absolute -top-2 -left-2 bg-amber-50 text-black rounded-full px-2 py-0.5 
									text-xs group-hover:bg-amber-100 transition duration-300 ease-in-out'
									>
										{cart.length}
									</span>
								)}
                </div>
                }
            </Link>

            {user && <button
              className="bg-neutral-400 hover:bg-amber-50 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              onClick={() => logout(navigate)}
            >
              <LogOut size={18}  className="text-black"/>
              <span className="hidden sm:inline ml-2 text-black">Log Out</span>
            </button>}

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
