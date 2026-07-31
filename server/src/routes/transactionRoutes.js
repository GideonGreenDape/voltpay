import { Router } from 'express';
import { Transaction } from '../models/Transaction.js';
import { getProvider } from '../services/provider/index.js';
import { envConfig } from '../config/env.js';

const router = Router();
const provider = getProvider();

router.post('/initialize', async (req, res) => {
  try {
    const { meterNumber, disco, amount, phoneNumber, email, paymentMethod } = req.body;
    
    // Create pending transaction record
    const reference = `MP-TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const transaction = await Transaction.create({
      reference,
      meterNumber,
      disco,
      amount,
      paymentMethod,
      status: 'PENDING'
    });

    // In a real app, this would return a Paystack/Flutterwave checkout URL
    res.json({ 
      success: true, 
      reference, 
      paymentDetails: { url: `https://mock-payment.gateway/${reference}` } 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/verify-payment', async (req, res) => {
  try {
    const { reference } = req.body;
    const transaction = await Transaction.findOne({ reference });
    
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
    
    // Simulate payment verification and token vending
    const vendResult = await provider.vendToken(reference, transaction.meterNumber, transaction.disco, transaction.amount);
    
    transaction.status = 'SUCCESS';
    transaction.token = vendResult.token;
    transaction.units = vendResult.units;
    await transaction.save();

    res.json({ success: true, transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;

