import {create} from "zustand";
import axios from "axios";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface PaymentInitiatePayload {
  return_url: string;
  website_url: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info: CustomerInfo;
}

interface PaymentResponse {
  pidx: string;
  payment_url: string;
  expires_at: string;
  expires_in: number;
}

interface VerifyPaymentResponse {
  pidx: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  [key: string]: any;
}

interface PaymentStore {
  paymentResponse?: PaymentResponse;
  verifyResponse?: VerifyPaymentResponse;
  error?: string;

  initiatePayment: (payload: PaymentInitiatePayload) => Promise<void>;
verifyPayment: (pidx: string) => Promise<VerifyPaymentResponse>;
}

const usePaymentStore = create<PaymentStore>((set) => ({
  paymentResponse: undefined,
  verifyResponse: undefined,
  error: undefined,

  initiatePayment: async (payload) => {
    console.log("paylod>>",payload)
    try {
      const { data } = await axios.post<PaymentResponse>(
        "http://localhost:5001/payment/initiate-payment",
        payload
      );
      console.log("data>>",data);
      window.open(data.payment_url, "_blank");
      set({ paymentResponse: data, error: undefined });
    } catch (error: any) {
      set({ error: error.response?.data || error.message, paymentResponse: undefined });
    }
  },

  verifyPayment: async (pidx) => {
    try {
      const { data } = await axios.post<VerifyPaymentResponse>(
        "http://localhost:5001/verify-payment/payment/",
        { pidx }
      );
      set({ verifyResponse: data, error: undefined });
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data || error.message);
    }
  }

}));

export default usePaymentStore;
