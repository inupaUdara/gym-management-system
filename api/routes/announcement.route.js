import express from 'express';
import { verifyToken } from '../utills/verifyUser.js';  
import { createAnnouncement, deleteAnnouncement, getAnnouncements, markAnnouncementAsSeen, updateAnnouncement } from '../controllers/announcement.controller.js';

const router = express.Router();

router.post('/createannouncement', verifyToken, createAnnouncement);  
router.get('/getAnnouncement', verifyToken, getAnnouncements);      
router.delete('/deleteAnnouncement/:announcementId', verifyToken, deleteAnnouncement);
router.put('/updateAnnouncement/:announcementId', verifyToken, updateAnnouncement)
router.post('/markAnnouncementAsSeen', verifyToken, markAnnouncementAsSeen);

export default router;