// controllers/emailController.js
import nodemailer from 'nodemailer';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gatein07@gmail.com', // Your Gmail email address
    pass: 'zqrm mzkv kqfi appw', // Your Gmail app password
  },
});

// Function to send email
export const sendEmail = async (req, res) => {
  const { name, email, title, message } = req.body;

  try {
    // Send email
    await transporter.sendMail({
      from: 'gatein07@gmail.com', // Sender email address
      to: email, // Recipient email address
      subject: title,
      text: message,
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};
