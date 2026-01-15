import { Request, Response } from 'express';
import { paymentService } from './payment.service.js';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, currency, receipt } = req.body;
    
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }

    const order = await paymentService.createOrder(amount, currency, receipt || `receipt_${Date.now()}`);
    res.status(200).json(order);
  } catch (error: any) {
    console.error('Error in createOrder controller:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment verification details' });
    }

    const isValid = paymentService.verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (isValid) {
      // TODO: Update user subscription status or grant access here
      res.status(200).json({ message: 'Payment verified successfully', success: true });
    } else {
      res.status(400).json({ message: 'Invalid payment signature', success: false });
    }
  } catch (error: any) {
    console.error('Error in verifyPayment controller:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};
