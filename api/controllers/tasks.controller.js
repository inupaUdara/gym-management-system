import Tasks from '../models/tasks.model.js';
import { errorHandler } from '../utills/error.js';

export const create = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to create a task'));
    }

    const { title } = req.body;
    if (!title || title.trim() === '') {
      return next(new Error('Title is required'));
    }

    const newTask = new Tasks({
      ...req.body,
      userId: req.user.id
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const gettasks = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const userId = req.query.userId;

    const query = userId ? { userId } : {};

    const tasks = await Tasks.find({
      ...(req.query.taskId && { _id: req.query.taskId }),
    }
    )
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .exec();

    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const deletetasks = async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to delete this task'));
    }

    await Tasks.findByIdAndDelete(req.params.taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updatetasks = async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this task'));
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
      req.params.taskId,
      {
        $set: {
          title: req.body.title,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          image: req.body.image,
          buttonState: req.body.buttonState
        },
      },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};
