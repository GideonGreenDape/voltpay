import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("Attempting login for:", phoneNumber); // Debug log
      // For now, allow any number to login with dummy user
      const dummyUser = { phoneNumber, name: 'John Doe' };
      onLogin(dummyUser);
      onClose();
      navigate('/dashboard'); // Navigate to dashboard
    } catch (err) {
      console.error("Auth error:", err); // Debug log
      alert('Auth failed. Please ensure the backend is running and the phone number is valid.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-[100]"
      >
        <motion.div 
          initial={{ scale: 0.9 }} animate={{ scale: 1 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Phone Number" 
              className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button onClick={handleSubmit} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700">Login</button>
          </div>
          <button onClick={onClose} className="mt-6 w-full text-slate-400 hover:text-slate-600">Close</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

