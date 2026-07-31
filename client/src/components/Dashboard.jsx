import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Dashboard = ({ user }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/v1/users/history/${user.phoneNumber}`);
        setHistory(data.history);
      } catch (err) { console.error(err); }
    };
    fetchHistory();
  }, [user]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 mt-12">
      <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
      <div className="space-y-4">
        {history.map(tx => (
          <div key={tx._id} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-bold">{tx.meterNumber}</p>
              <p className="text-sm text-slate-500">{new Date(tx.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">₦{tx.amount}</p>
              <p className={`text-xs font-bold ${tx.status === 'SUCCESS' ? 'text-emerald-600' : 'text-amber-600'}`}>{tx.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

