
import nodemailer from 'nodemailer';

const sendResetEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <p>Hello,</p>
      <p>You have requested to reset your password. Please click on the link below to reset your password:</p>
      <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Error sending password reset email.');
  }
};

export default sendResetEmail;
