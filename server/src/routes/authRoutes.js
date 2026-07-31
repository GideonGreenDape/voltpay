import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log("Login request received for:", phoneNumber); // Debug log
    let user = await User.findOne({ phoneNumber });
    if (!user) {
      user = await User.create({ phoneNumber });
      console.log("New user created:", user); // Debug log
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Login error:", error); // Debug log
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;

