import mongoose from 'mongoose';
import Complaint from '../model/complaintModel.js';

// Function to clean up unverified complaints
const cleanupUnverifiedComplaints = async () => {
  try {
    const expirationTime = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
    const result = await Complaint.deleteMany({
      otpVerified: false,
      createdAt: { $lt: expirationTime }
    });
    console.log(`Deleted ${result.deletedCount} unverified complaints.`);
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};

// Schedule the cleanup to run every minute
setInterval(cleanupUnverifiedComplaints, 30 * 60 * 1000);