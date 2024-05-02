import express from 'express';
import {  forgotPassword, google, otpVerification, resetPassword, signin, signup } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.post('/forgotpassword', forgotPassword);
router.post('/otpVerification',otpVerification);
router.post('/resetPassword',resetPassword)


export default router;