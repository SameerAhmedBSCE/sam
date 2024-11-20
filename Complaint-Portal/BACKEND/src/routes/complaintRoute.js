// routes/complaint.js
import express from 'express';
import { submitComplaint, verifyOTP, resendOTP } from '../controller/complaintController.js';
import {uploadMiddleware} from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Submit complaint route with file uploads
router.post('/submit', uploadMiddleware, submitComplaint);

// Verify OTP route
router.post('/verify', verifyOTP);

// Resend OTP route
router.post('/resendOtp', resendOTP);


export default router;
