import axios from "axios";
import express from "express";
import {Request, Response} from "express";
const router = express.Router();

const KHALTI_URL = 'https://dev.khalti.com/api/v2/epayment/initiate/';
const KHALTI_SECRET_KEY = '6d655b9b33da40f785d9bf11457a117d';

router.post('/initiate-payment', async (req:Request, res:Response) => {
const { return_url, website_url, amount, purchase_order_id, purchase_order_name, customer_info } = req.body;

  const payload = {
    return_url,
    website_url,
    amount,
    purchase_order_id,
    purchase_order_name,
    customer_info
  };

  try {
    const response = await axios.post(KHALTI_URL, payload, {
      headers: {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error:any) {
    res.status(400).json({ error: error.response?.data || 'Payment initiation failed' });
  }
});

router.get('/payment-success', (req, res) => {
    const { pidx, status } = req.query;

    if (status === 'Completed') {
        res.send('Payment successful!');
    } else if (status === 'User canceled') {
        res.send('Payment canceled by user.');
    } else {
        res.send('Payment is pending.');
    }
});


router.post('/verify-payment', async (req, res) => {
    const { pidx } = req.body;
    try {
        const response = await axios.get(`https://dev.khalti.com/api/v2/epayment/lookup/?pidx=${pidx}`, {
            headers: {
                Authorization: `Key ${KHALTI_SECRET_KEY}`,
            },
        });

        res.status(200).json(response.data); // Payment details
    } catch (error:any) {
        console.error(error.response?.data || error.message);
        res.status(400).json({ error: error.response?.data || 'Verification failed' });
    }
});

export default router;
