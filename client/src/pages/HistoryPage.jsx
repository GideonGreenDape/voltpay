import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const history = [
    { id: 'TXN1001', amount: 5000, date: '2024-10-24', status: 'Success' },
    { id: 'TXN1002', amount: 2000, date: '2024-10-23', status: 'Success' },
    { id: 'TXN1003', amount: 10000, date: '2024-10-20', status: 'Success' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="mb-6 text-slate-500 hover:text-slate-900">&larr; Back to Dashboard</button>
        <h1 className="text-3xl font-black mb-8">Transaction History</h1>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {history.map((t) => (
            <div key={t.id} className="flex justify-between items-center p-6 border-b last:border-0">
              <div>
                <p className="font-bold">{t.id}</p>
                <p className="text-sm text-slate-400">{t.date}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-600">₦{t.amount.toLocaleString()}</p>
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{t.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
