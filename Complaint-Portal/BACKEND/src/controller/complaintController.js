// controllers/complaintController.js
import Complaint from '../model/complaintModel.js';
import crypto from 'crypto';

// Generate a random OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Submit Complaint and generate OTP
export const submitComplaint = async (req, res) => {
  const { name, email, phone, complaintDetails, uc, town } = req.body;
  const attachments = req.files ? req.files.map(file => file.path) : [];

  // Validate UCs and town
  const validUcs = [26,27,28,29,30,17,18,19,20,21,22];
  const validTowns = ['Gulberg Town', 'North Nazimabad'];

  const ucNumber = Number(uc);
if (!validUcs.includes(ucNumber)) {
  return res.status(400).json({ message: 'Invalid UC provided.' });
}

  if (!validTowns.includes(town)) {
    return res.status(400).json({ message: 'Invalid town provided.' });
  }

  try {
    const otp = generateOTP();
    const complaint = new Complaint({
      name,
      email,
      phone,
      complaintDetails,
      uc,
      town,
      otp,
      otpExpiration: new Date(Date.now() + 5 * 60 * 1000), // Set expiration to 5 minutes from now
      attachments, // Include attachments
    });
    console.log("OTP", otp);

    await complaint.save({ validateBeforeSave: false });
    // Here, you would send the OTP to the user's email/phone
    // For example: await sendOTPToUser(phone, otp);

    res.status(200).json({ message: 'Complaint submitted. Please verify your OTP.' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting complaint', error });
  }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
  const { complaintId, otp } = req.body;
  
  try {
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if OTP has expired
    if (new Date() > complaint.otpExpiration) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (complaint.otp === otp) {
      complaint.otpVerified = true;
      await complaint.save();
      res.status(200).json({ message: 'OTP verified. Complaint submitted successfully.' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error });
  }
};

// Resend OTP
export const resendOTP = async (req, res) => {
    const { complaintId } = req.body;
  
    try {
      const complaint = await Complaint.findById(complaintId);
  
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      // Check if OTP has already been verified
      if (complaint.otpVerified) {
        return res.status(400).json({ message: 'OTP has already been verified. Cannot resend.' });
      }
  
      // Generate a new OTP and reset expiration
      const otp = generateOTP();
      complaint.otp = otp;
      complaint.otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // Reset expiration to 5 minutes from now
      await complaint.save();
  
      console.log("Resent OTP:", otp);
      // Here, you would send the new OTP to the user's email/phone
  
      res.status(200).json({ message: 'OTP resent. Please check your email/phone.' });
    } catch (error) {
      res.status(500).json({ message: 'Error resending OTP', error });
    }
  };
  