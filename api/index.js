// import express from 'express';
// import { PORT, mongoDBURL } from './config.js';
// import mongoose from 'mongoose';
// import booksRoute from './routes/booksRoute.js';
// import cors from 'cors';

// const app = express();
// dotenv.config();

// app.use(express.json());

// app.use(cors());

// app.get('/', (request, response) => {
//   console.log(request);
//   return response.status(234).send('Welcome To MERN Stack Tutorial');
// });

// app.use('/books', booksRoute);

// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
// import {config} from 'dotenv';


dotenv.config();



mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());


app.use(cors());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/books",booksRoute);
// app.use("/getAllBooks",booksRoute);
// app.use("/getOneBook",booksRoute);
// app.use("/updateBook",booksRoute);
// app.use("/deleteBook",booksRoute);



app.use((err, request, response, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

