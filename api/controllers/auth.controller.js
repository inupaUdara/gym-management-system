import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utills/error.js";
import jwt from "jsonwebtoken"; 
import sendResetEmail from "../utills/email.js";
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';



export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === '' || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET_EMP
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_EMP
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET_EMP
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

function generateNumericOTP(length) {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}


export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Find the user with the provided email address
    const user = await User.findOne({ email });

    // If no user found with the provided email, return an error
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Generate a JWT token with user's ID
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_EMP, {
      expiresIn: "15m", // Token expires in 15 minutes
    });

    
    // Store token in cookie
    res.cookie('resetToken', token, { httpOnly: true, maxAge: 3600000 }); // Max age set to 1 hour in milliseconds
    res.cookie('userEmail', user.email, { maxAge: 3600000 });

    // Generate Numeric OTP
    const otp = generateNumericOTP(6);

    // Save the OTP in the database
    user.otp = otp;
    await user.save();

    // Send OTP via Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'chaminduwn@gmail.com',
          pass: 'cnkt cykq hczs aciq',
        // user: 'chamindunw@gmail.com',
        // pass: 'akwd cjyp eusb pfhv',
      },
    });

    // Define email content
    const mailOptions = {
      from: 'chaminduwn@gmail.com',
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).send({ status: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).send({ status: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).send({ status: 'Internal server error' });
  }
}

// OTP Verification route
export const otpVerification = async (req, res, next) => {
  const { otp, userEmail } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send({ status: "User not found" });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).send({ status: "Incorrect OTP" });
    }

    // Clear the OTP from the database after successful verification
    user.otp = null;
    await user.save();

    // Send success response
    return res.status(200).send({ status: "Success" });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).send({ status: "Error processing request" });
  } 
};



// export const resetpassword = async (req, res, next) => {

//   const { Password ,userEmail} = req.body;
//   try {
//     if (!Password) {
//       return res.status(400).send({
//         status: 'Error resetting password',
//         message: 'Password field is required',
//       });
//     }

    

//     const user = await User.findOne({ email: userEmail });

//     if (!user) {
//       return res.status(404).send({
//         status: 'Error resetting password',
//         message: 'User not found',
//       });
//     }

//     const hashedPassword = await bcryptjs.hash(Password, 10);

//     user.password = hashedPassword;
//     await user.save();

//     return res.send({ status: 'Password reset successfully' });
//   } catch (error) {
//     console.error('Error resetting password:', error);
//     return res
//       .status(500)
//       .send({ status: 'Error resetting password', message: error.message });
//   }
// };


export const resetPassword = async (req, res, next) => {
  const { password, userEmail } = req.body;
  try {
    // Check if the password field is provided
    if (!password) {
      return res.status(400).json({
        status: 'Error resetting password',
        message: 'Password field is required',
      });
    }

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({
        status: 'Error resetting password',
        message: 'User not found',
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password with the hashed password
    user.password = hashedPassword;
    await user.save();

    // Return a success message
    return res.json({ status: 'Password reset successfully' });
  } catch (error) {
    // Handle any errors that occur during the password reset process
    console.error('Error resetting password:', error);
    return res.status(500).json({
      status: 'Error resetting password',
      message: error.message,
    });
  }
};