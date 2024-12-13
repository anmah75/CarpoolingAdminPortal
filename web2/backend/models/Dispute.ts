import mongoose from 'mongoose'

const disputeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Dispute', disputeSchema)

