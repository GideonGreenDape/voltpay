import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiscoSelector } from '../components/DiscoSelector';

export const DashboardPage = ({ user }) => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ meterNumber: '', disco: '', amount: '' });
  const [meterDetails, setMeterDetails] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Dummy user data
  const currentUser = user || { phoneNumber: '08012345678', name: 'John Doe' };

  const verifyMeter = () => {
    setMeterDetails({ customerName: 'John Doe', address: '123 Main St, Lagos' });
    setStep(2);
  };

  const handlePayment = () => {
    setShowBuyModal(false);
    setShowSuccess(true);
    setStep(1);
    setFormData({ meterNumber: '', disco: '', amount: '' });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900">{getGreeting()}, {currentUser.name}</h1>
          <p className="text-slate-500 mt-4 ">Managing {currentUser.phoneNumber}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-slate-900 text-white px-6 py-2 rounded-full font-semibold hover:bg-slate-800 transition"
        >
          Logout
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 text-white p-8 rounded-3xl col-span-2 shadow-lg">
          <h3 className="text-emerald-100 font-medium mb-2">Total Spent</h3>
          <p className="text-5xl font-black mb-6">₦42,500.00</p>
          <button onClick={() => navigate('/history')} className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold">View History</button>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
          <button onClick={() => setShowBuyModal(true)} className="w-full bg-emerald-600 text-white p-4 rounded-xl mb-3 font-semibold hover:bg-emerald-700">
            Buy Token
          </button>
          <button onClick={() => navigate('/saved-meters')} className="w-full bg-slate-100 text-slate-700 p-4 rounded-xl font-semibold hover:bg-slate-200">
            Saved Meters
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 col-span-3">
          <h3 className="font-bold text-slate-900 mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="font-bold">Token Purchase - {i}0239482039</p>
                  <p className="text-xs text-slate-400">Oct 24, 2026</p>
                </div>
                <p className="font-black text-emerald-600">+₦5,000</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Buy Token Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            {step === 1 ? (
              <>
                <h2 className="text-2xl font-bold mb-6">Buy Token</h2>
                <DiscoSelector onSelect={(d) => setFormData({...formData, disco: d})} selected={formData.disco} />
                <input className="w-full mt-4 p-4 bg-slate-50 border rounded-2xl" placeholder="Meter Number" onChange={(e) => setFormData({...formData, meterNumber: e.target.value})} />
                <button onClick={verifyMeter} className="w-full mt-4 bg-emerald-600 text-white py-4 rounded-2xl font-bold">Verify</button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Confirm {meterDetails.customerName}</h2>
                <input type="number" className="w-full p-4 bg-slate-50 border rounded-2xl" placeholder="Amount" onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                <button onClick={handlePayment} className="w-full mt-4 bg-slate-900 text-white py-4 rounded-2xl font-bold">Pay ₦{formData.amount}</button>
              </>
            )}
            <button onClick={() => setShowBuyModal(false)} className="mt-4 w-full text-slate-400">Cancel</button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-emerald-500/20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-slate-500 mt-2">Your token has been generated.</p>
            <button onClick={() => setShowSuccess(false)} className="mt-6 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

