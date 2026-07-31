import mongoose from 'mongoose';

const meterSchema = new mongoose.Schema({
  meterNumber: { type: String, required: true, index: true },
  disco: { 
    type: String, 
    enum: ['AEDC', 'EKEDC', 'IKEDC', 'IBEDC', 'KAEDCO', 'PHED', 'EEDC', 'BEDC', 'JED', 'YEDC'], 
    required: true 
  },
  meterType: { type: String, enum: ['PREPAID', 'POSTPAID'], required: true },
  customerName: String,
  address: String
}, { timestamps: true });

export const Meter = mongoose.model('Meter', meterSchema);
