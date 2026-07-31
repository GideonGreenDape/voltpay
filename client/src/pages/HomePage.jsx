import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { DiscoSelector } from '../components/DiscoSelector';
import { TokenDisplayModal } from '../components/TokenDisplayModal';
import { AuthModal } from '../components/AuthModal';

export const HomePage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ meterNumber: '', disco: '', type: 'PREPAID', amount: '' });
  const [meterDetails, setMeterDetails] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const verifyMeter = async () => {
    setLoading(true);
    setError(null);
    try {
      // For testing, mock logic returns success for anything NOT starting with '000'
      const { data } = await axios.post('http://localhost:3000/api/v1/meters/verify', formData);
      setMeterDetails(data.data);
      setStep(2);
    } catch (err) {
      setError('Verification failed. Try meter: 1234567890');
    }
    setLoading(false);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const init = await axios.post('http://localhost:3000/api/v1/transactions/initialize', formData);
      const verify = await axios.post('http://localhost:3000/api/v1/transactions/verify-payment', { reference: init.data.reference });
      setTransaction(verify.data.transaction);
    } catch (err) {
      setError('Payment failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-white border-b border-slate-100 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-emerald-600 tracking-tighter">VOLTPAY LTD</h1>
          <div className="space-x-6 text-sm font-semibold text-slate-600">
            {user ? (
              <span className="text-emerald-700 font-bold">{user.phoneNumber}</span>
            ) : (
            <button onClick={() => setIsAuthOpen(true)} className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-slate-800 transition">Login</button>
            )}
        </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto mt-16 px-6 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-6xl font-extrabold text-slate-900 leading-tight mb-6">Power Your Home, <span className="text-emerald-600">Instantly.</span></h2>
          <p className="text-xl text-slate-500 mb-8">Purchase electricity tokens for any DISCO in Nigeria. Fast, secure, and hassle-free vending.</p>
          <div className="flex gap-4">
            <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl font-bold">✓ Instant Token</div>
            <div className="p-4 bg-amber-100 text-amber-700 rounded-2xl font-bold">✓ 24/7 Support</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8">
          {error && <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">{error}</div>}

          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-xl font-bold mb-6">Buy Electricity Token</h3>
              <DiscoSelector onSelect={(d) => setFormData({...formData, disco: d})} selected={formData.disco} />

              <div className="mt-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Meter Number</label>
                <input
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
                  placeholder="e.g. 01020304050"
                  onChange={(e) => setFormData({...formData, meterNumber: e.target.value})}
                />
              </div>

              <button
                onClick={verifyMeter}
                disabled={loading || !formData.meterNumber || !formData.disco}
                className="w-full mt-8 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Meter'}
              </button>
            </motion.div>
          )}

          {step === 2 && meterDetails && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-xl font-bold mb-6">Confirm Details</h3>
              <div className="bg-emerald-50 p-6 rounded-2xl mb-8 border border-emerald-100">
                <p className="text-emerald-900 font-bold text-lg">{meterDetails.customerName}</p>
                <p className="text-emerald-700 text-sm mt-1">{meterDetails.address}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Amount (₦)</label>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[2000, 5000, 10000, 20000].map(amt => (
                    <button key={amt} onClick={() => setFormData({...formData, amount: amt})} className="p-2 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition">₦{amt/1000}k</button>
                  ))}
                </div>
                <input
                  type="number"
                  value={formData.amount}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Enter amount"
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                {loading ? 'Processing...' : `Pay ₦${formData.amount || '0'}`}
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* New Sections */}
      <section className="max-w-7xl mx-auto mt-32 px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
          <img
            src="https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Electricity Power Lines"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="space-y-6">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Reliable Infrastructure</span>
          <h2 className="text-5xl font-extrabold text-slate-900 leading-tight">Seamless Electricity Vending</h2>
          <p className="text-xl text-slate-600">VoltPay bridges the gap between you and your utility provider. Experience lightning-fast token generation without leaving your couch, backed by robust grid infrastructure.</p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-bold">Secure Payments</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="text-3xl mb-2">🌍</div>
              <p className="font-bold">All DISCOs Included</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-32 px-6 py-20 bg-emerald-50 rounded-3xl text-center">
        <h2 className="text-4xl font-extrabold mb-6">Need Assistance?</h2>
        <p className="text-lg text-emerald-900 mb-8 max-w-2xl mx-auto">Our dedicated support team is available around the clock to help you with any issues regarding your token or meter.</p>
        <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700">Contact Support</button>
      </section>

      <footer className="mt-32 py-16 bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-4">VoltPay Ltd</h3>
            <p className="text-sm">Powering homes across Nigeria with reliable energy solutions.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Prepaid Token</li>
              <li>Meter Verification</li>
              <li>Bill History</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          &copy; 2026 VoltPay Ltd. All rights reserved.
        </div>
      </footer>

      {transaction && <TokenDisplayModal transaction={transaction} onClose={() => setTransaction(null)} />}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={setUser} />
    </div>
  );
};

