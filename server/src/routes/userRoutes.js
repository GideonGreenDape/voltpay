import { Router } from 'express';
import { Transaction } from '../models/Transaction.js';

const router = Router();

router.get('/history/:phoneNumber', async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    // In a real app, you'd use the userId linked to the session
    // For this mock, we'll find transactions by the phoneNumber (as the owner)
    // Assuming transactions had an 'ownerPhone' field or similar; 
    // for now let's just mock returning some data for the user
    const history = await Transaction.find({ userId: phoneNumber }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;

