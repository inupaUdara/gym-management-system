// import express from 'express';
// import { Book } from '../models/bookModel.js';

// const router = express.Router();

// // Route for Save a new Booking
// router.post('/', async (request, response) => {
//   try {
//     if (
//       !request.body.name ||
//       !request.body.email ||
//       !request.body.age ||
//       !request.body.cname ||
//       !request.body.date ||
//       !request.body.time ||
//       !request.body.msg
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields name, email, age, cname, date, time, msg ',
//       });
//     }
//     const newBook = {
//         name:request.body.name,
//         email:request.body.email,
//         age:request.body.age,
//         cname:request.body.cname,
//         date:request.body.date,
//         time:request.body.time,
//         msg:request.body.msg,
//     };

//     const book = await Book.create(newBook);

//     return response.status(201).send(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Get All Bookings from database
// router.get('/', async (request, response) => {
//   try {
//     const books = await Book.find({});

//     const bookArray = [books]
//     return response.status(200).json({
//       bookArray
//     });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Get One Booking from database by id
// router.get('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const book = await Book.findById(id);

//     return response.status(200).json(book);
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Update a Booking
// router.put('/:id', async (request, response) => {
//   try {
//     if (
//         !request.body.name ||
//         !request.body.email ||
//         !request.body.age ||
//         !request.body.cname ||
//         !request.body.date ||
//         !request.body.time ||
//         !request.body.msg
//     ) {
//       return response.status(400).send({
//         message: 'Send all required fields',
//       });
//     }

//     const { id } = request.params;

//     const result = await Book.findByIdAndUpdate(id, request.body);

//     if (!result) {
//       return response.status(404).json({ message: 'Book not found' });
//     }

//     return response.status(200).send({ message: 'Book updated successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

// // Route for Delete a book
// router.delete('/:id', async (request, response) => {
//   try {
//     const { id } = request.params;

//     const result = await Book.findByIdAndDelete(id);

//     if (!result) {
//       return response.status(404).json({ message: 'Book not found' });
//     }

//     return response.status(200).send({ message: 'Book deleted successfully' });
//   } catch (error) {
//     console.log(error.message);
//     response.status(500).send({ message: error.message });
//   }
// });

//new coding start form here

import express from "express";
import {
  bookAdd,
  getAllBooks,
  getOneBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/bookAdd", bookAdd);
router.get("/getAllBooks", getAllBooks);
router.get("/getOneBook/:id", getOneBook);
router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);

export default router;
