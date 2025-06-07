
import usePaymentStore from "@/store/usePayment";
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";



const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const pidx = searchParams.get("pidx");
  const status = searchParams.get("status");

  
const {verifyPayment} = usePaymentStore();



  useEffect(() => {
    if (pidx) {
      handleVerification(pidx);
    }
  }, [pidx]);

  const handleVerification = async (pidx: string) => {
    try {
      const paymentDetails = await verifyPayment(pidx);
      console.log("payment detail>>",paymentDetails);
      if (paymentDetails.status === "Completed") {
        toast.success("payment successful!!!")
      } else {
        alert("Payment is pending or failed.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    // <div className="container">
    //   <h1>Payment Status</h1>
    //   <p>Status: {status}</p>
    //   {status === "Completed" ? (
    //     <p>payment successful</p>
    //   ) : (
    //     <p>Payment failed or was canceled.</p>
    //   )}
    // </div>
    		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={1000}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-[#191919] shadow-neutral-400 rounded-lg inset-shadow-zinc-100 overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-amber-50 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-amber-50 mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-gray-300 text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-amber-50 text-center text-sm mb-6'>
						Check your email for order details and updates.
					</p>
					<div className='bg-[#2e2e2e] rounded-lg p-4 mb-6'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-gray-400'>Order number</span>
							<span className='text-sm font-semibold text-amber-50'>#343h4b272b</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-400'>Estimated delivery</span>
							<span className='text-sm font-semibold text-amber-50'>2-3 days</span>
						</div>
					</div>

					<div className='space-y-4'>
						<Link
							to={"/"}
							className='w-full bg-[#353535] hover:bg-[#393939] text-amber-50 font-bold py-2 px-4 
                        rounded-lg transition duration-300 flex items-center justify-center'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
  );
};

export default PaymentSuccess;