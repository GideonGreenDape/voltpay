import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const TokenDisplayModal = ({ transaction, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(transaction.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        initial={{ scale: 0.9 }} animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center"
      >
        <h2 className="text-2xl font-bold text-emerald-600 mb-4">Token Generated!</h2>
        <div className="bg-slate-100 p-4 rounded-lg mb-6">
          <p className="text-3xl font-mono font-bold tracking-widest">{transaction.token}</p>
        </div>
        <p className="mb-6">Units: <span className="font-bold">{transaction.units} kWh</span></p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={copyToken}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800"
          >
            {copied ? 'Copied!' : 'Copy Token'}
          </button>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
