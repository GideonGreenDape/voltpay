import { Router } from 'express';
import { getProvider } from '../services/provider/index.js';
import { envConfig } from '../config/env.js';

const router = Router();
const provider = getProvider();

router.post('/verify', async (req, res) => {
  try {
    const { meterNumber, disco, type } = req.body;
    const data = await provider.verifyMeter(meterNumber, disco, type);
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;

