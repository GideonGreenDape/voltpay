import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const DiscoSelector = ({ onSelect, selected }) => {
  const discos = ['AEDC', 'EKEDC', 'IKEDC', 'IBEDC', 'KAEDCO', 'PHED', 'EEDC', 'BEDC', 'JED', 'YEDC'];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {discos.map(disco => (
        <button
          key={disco}
          onClick={() => onSelect(disco)}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
            selected === disco 
              ? 'border-emerald-500 bg-emerald-50 shadow-sm'
              : 'border-slate-200 hover:border-emerald-200 bg-white'
          }`}
        >
          <span className="font-bold text-slate-800">{disco}</span>
        </button>
      ))}
    </div>
  );
};

