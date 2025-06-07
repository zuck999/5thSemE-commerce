
import usePaymentStore from "@/store/usePayment";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


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
      if (paymentDetails.status === "Completed") {
        alert("Payment successfully verified!");
      } else {
        alert("Payment is pending or failed.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <div className="container">
      <h1>Payment Status</h1>
      <p>Status: {status}</p>
      {status === "Completed" ? (
        <p>Verifying payment...</p>
      ) : (
        <p>Payment failed or was canceled.</p>
      )}
    </div>
  );
};

export default PaymentSuccess;