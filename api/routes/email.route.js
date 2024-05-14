// routes/emailRoutes.js
import express from 'express';
import { sendEmail } from '../controllers/email.controller.js';

const router = express.Router();

// Route to send email
router.post('/send-email', sendEmail);

export default router;
