import User from "../models/user.model.js";
import { errorHandler } from "../utills/error.js";
import bcryptjs from 'bcryptjs';


export const test = (req, res) => {
  res.json({ message: 'API is working!' });z
};

export const updateUser = async (req, res, next) => {
if (req.user.id !== req.params.userId){
  return next(errorHandler(403,'your not allowed to update this user'));
}

 // Validate contactNumber
 if (req.body.contactNumber) {
  const contactNumber = req.body.contactNumber;
  if (!/^\d{1,10}$/.test(contactNumber)) {
    return next(errorHandler(400, 'Contact number must contain only digits and have a maximum length of 10'));
  }
}

if(req.body.password){
  if(req.body.password.length < 6){
    return next(errorHandler(400,'password must be atleast 6 characters'));
  }
  req.body.password = bcryptjs.hashSync(req.body.password, 10);
}

if (req.body.username) {    
  if (req.body.username.length < 7 || req.body.username.length > 20) {
    return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
  }
  if (req.body.username.includes(' ')) {
    return next(errorHandler(400, 'Username cannot contain spaces'));
  }
  if (req.body.username !== req.body.username.toLowerCase()) {
    return next(errorHandler(400, 'Username must be lowercase'));
  }
  if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
    return next(
      errorHandler(400, 'Username can only contain letters and numbers')
    );
  }
}
try {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        password: req.body.password,       
        name: req.body.name,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        contactNumber: req.body.contactNumber
      },
    },
    { new: true }
  );
  const { password, ...rest } = updatedUser._doc;
  res.status(200).json(rest);
} catch (error) {
  next(error);
}
};

export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};


export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};


export const getusers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const searchQuery = req.query.search || '';
    const userId = req.query.userId;

    const query = userId ? { userId } : {};

    const users = await User.find({
      username: { $regex: new RegExp(searchQuery, 'i') },
      ...(req.query.userId && { _id: req.query.userId }),
    })
    .sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

    const totalUsers = await User.countDocuments(); // Count total users

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthUsers = await User.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers, // Include totalUsers in response
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};