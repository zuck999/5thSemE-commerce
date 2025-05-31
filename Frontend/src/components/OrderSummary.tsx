import { motion } from "framer-motion";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, X } from "lucide-react";
import { useAddOrSubQuentity } from "@/store/useItemStroe";


const OrderSummary=() => {
	const { total } = useCartStore();
    	const {cart} = useCartStore();


        const {item} = useAddOrSubQuentity()
    

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-emerald-400'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2 '>
                    <div className="flex justify-between border-b border-gray-600 mb-3 pb-1 px-1">
						<div className='text-base font-normal text-gray-300'>product name</div>
						<div className='text-base font-normal text-gray-300 '>price</div>
                    </div>


					<dl className='flex items-center justify-between gap-4'>
						{
                            <div className="flex flex-col">
                              {cart.map((value, idx) => (
                                <div>
                                    <span key={idx} className="">{value.name}</span>
                                </div>
						))}
                        </div>
                        }
                        <div className="flex">
						{
                            <div className="flex flex-col">
                              {cart.map((value, idx) => (
							    <div className="flex gap-0.5">
                                    <span key={idx} className="">{value.price}</span>
                                    <span key={idx} className="flex justify-center items-center"><X className="size-[15px]"/></span>
                                    <span key={idx} className="">{value.quantity}</span>
                                </div>
						))}
                        </div>
                        }
                        </div>
					</dl>

					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-emerald-400'>${total}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={()=>{}}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};
export default OrderSummary;
