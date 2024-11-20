// src/middleware/uploadMiddleware.js

import multer from 'multer';
import path from 'path';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to the file name
  },
});

// Initialize multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Optional: filter for file types (e.g., only allow certain extensions)
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.pdf') {
      return cb(new Error('Only images and PDFs are allowed'));
    }
    cb(null, true);
  },
});

// Export the middleware
export const uploadMiddleware = upload.array('attachments');
