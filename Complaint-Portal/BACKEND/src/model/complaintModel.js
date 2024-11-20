import mongoose, { Schema } from "mongoose";

const complaintSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  complaintDetails: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpVerified: {
    type: Boolean,
    default: false,
  },
  otpExpiration: {
    type: Date,
  },
  uc: {
    type: Number,
    required: true,
    enum: [26,27,28,29,30,17,18,19,20,21,22], // Allowed UCs
  },
  town: {
    type: String,
    required: true,
    enum: ['Gulberg Town', 'North Nazimabad'], // Allowed towns
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in process', 'rejected', 'completed'],
    default: 'pending',
  },
  assignedTo: {
    type: String,
    required: false,
  },
  attachments: [{
    type: String,
    required: false,
  }],
  feedback: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;