import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true, required: true, index: true },
  email: { type: String },
  passwordHash: { type: String },
  savedMeters: [{
    meterNumber: String,
    discoSlug: String,
    alias: String
  }],
  walletBalance: { type: Number, default: 0 }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
