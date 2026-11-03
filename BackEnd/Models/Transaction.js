const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  type: { type: String, enum: ['transfer', 'deposit', 'withdrawal'], required: true },
  amount: { type: Number, required: true, min: 1 },
  description: { type: String, default: '' },
  status: { type: String, enum: ['success', 'failed'], default: 'success' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
