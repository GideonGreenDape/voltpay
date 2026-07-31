import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SavedMetersPage = () => {
  const navigate = useNavigate();
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [formData, setFormData] = useState({ amount: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const savedMeters = [
    { id: 1, meterNumber: '0102030405', disco: 'Ikeja Electric' },
    { id: 2, meterNumber: '0908070605', disco: 'Eko Electric' },
  ];

  const handleRepurchase = (meter) => {
    setSelectedMeter(meter);
  };

  const submitRepurchase = () => {
    setSelectedMeter(null);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="mb-6 text-slate-500 hover:text-slate-900">&larr; Back to Dashboard</button>
        <h1 className="text-3xl font-black mb-8">Saved Meters</h1>
        <div className="grid gap-6">
          {savedMeters.map((m) => (
            <div key={m.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{m.meterNumber}</p>
                <p className="text-slate-500">{m.disco}</p>
              </div>
              <button onClick={() => handleRepurchase(m)} className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700">Repurchase</button>
            </div>
          ))}
        </div>
      </div>

      {/* Repurchase Modal */}
      {selectedMeter && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">Repurchase Token</h2>
            <p className="text-slate-500 mb-6">{selectedMeter.meterNumber} - {selectedMeter.disco}</p>
            <input
              type="number"
              className="w-full p-4 bg-slate-50 border rounded-2xl mb-4"
              placeholder="Amount (₦)"
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
            />
            <button onClick={submitRepurchase} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700">Pay ₦{formData.amount || '0'}</button>
            <button onClick={() => setSelectedMeter(null)} className="mt-4 w-full text-slate-400">Cancel</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-emerald-500/20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold">Purchase Successful!</h2>
            <p className="text-slate-500 mt-2">Token sent to your phone.</p>
            <button onClick={() => setShowSuccess(false)} className="mt-6 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

