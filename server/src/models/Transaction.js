import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  reference: { type: String, unique: true, required: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  meterNumber: { type: String, required: true },
  disco: { type: String, required: true },
  amount: { type: Number, required: true },
  convenienceFee: { type: Number, default: 100 },
  token: { type: String },
  units: { type: Number },
  status: { 
    type: String, 
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'], 
    default: 'PENDING' 
  },
  paymentMethod: { type: String, enum: ['CARD', 'BANK_TRANSFER', 'WALLET'] },
  rawProviderResponse: { type: Object }
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);
