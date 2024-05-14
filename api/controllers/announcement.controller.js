import Announcement from "../models/announcement.model.js";
import { errorHandler } from "../utills/error.js";

export const createAnnouncement = async (req, res, next) => {
  if (!req.user.role === "Admin") {
    next(errorHandler(403, "You are not allowed to create announcement"));
  }

  if (!req.body.title || !req.body.message) {
    return next(errorHandler(400, "All field are required"));
  }
// Test
  const announcement = new Announcement({
    ...req.body,
  });

  try {
    const saveAnnouncement = await announcement.save();
    res.status(201).json(saveAnnouncement);
  } catch (error) {
    next(error);
  }
};

export const getAnnouncements = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit);
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const announcements = await Announcement.find({
      ...(req.query.announcementId && { _id: req.query.announcementId }),
    })
      .sort({ createdAt: sortDirection })
      .limit(limit);
    res.status(200).json({ announcements });
  } catch (error) {
    next(error);
  }
};

export const deleteAnnouncement = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(403, "You are not access to announcements"));
  }
  try {
    await Announcement.findByIdAndDelete(req.params.announcementId);
    res.status(200).json("The Announcement is deleted");
  } catch (error) {
    next(error);
  }
};

export const updateAnnouncement = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(403, "You are not access to announcements"));
  }

  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.announcementId,
      {
        $set: {
          title: req.body.title,
          message: req.body.message,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    next(error);
  }
};

export const markAnnouncementAsSeen = async (req, res, next) => {
  try {
    const { announcementId, userId } = req.body;
    const announcement = await Announcement.findById(announcementId);

    if (!announcement.seenBy.includes(userId)) {
      // Add the user ID to the seenBy array
      announcement.seenBy.push(userId);

      // Save the updated announcement to the database
      await announcement.save();

      return res.status(200).json({ message: "Announcement marked as seen" });
    } else {
      return res
        .status(400)
        .json({ message: "User has already seen the announcement" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
