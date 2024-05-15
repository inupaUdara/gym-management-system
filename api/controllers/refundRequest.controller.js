import RefundRequest from "../models/refundRequest.js";
import { errorHandler } from "../utills/error.js";

export const createRefundRequest = async (req, res, next) => {
  try {
    const requiredFields = [
      "refundId",
      "refundReason",
      "paymentId",
      "refundDescription",
      "userEmail",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).send({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    const {
      refundId,
      refundReason,
      paymentId,
      refundDescription,
      photo,
      status,
      userEmail,
    } = req.body;

    // Additional validation (like regex checks) can be performed here

    const newRefundRequest = {
      refundId,
      refundReason,
      paymentId,
      refundDescription,
      photo,
      status,
      userEmail,
    };

    const savedRefundRequest = await RefundRequest.create(newRefundRequest);
    console.log("Data Added Successfully");

    return res.status(201).send(savedRefundRequest);
  } catch (error) {
    console.error("Failed to add payment shop data:", error);
    next(errorHandler(500, { message: error.message }));
  }
};

//Get All Data from Refunds
export const getRefundRequests = async (req, res, next) => {
  try {
    const savedRefundRequest = await RefundRequest.find({});

    return res.status(200).json({
      count: savedRefundRequest.length,
      data: savedRefundRequest,
    });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//Get data according to the ID
export const getIdSRefunds = async (req, res, next) => {
  try {
    const { id } = req.params;
    const savedRefundRequest = await RefundRequest.findById(id);

    if (!savedRefundRequest) {
      return res
        .status(404)
        .json({ message: "According to the ID transaction not found (404)" });
    }
    return res.status(200).json(savedRefundRequest);
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//Get data according to the UserEmail
export const getIdSRefundsUserEmail = async (req, res, next) => {
  try {
    const { userEmail } = req.params;
    const savedRefundRequests = await RefundRequest.find({
      userEmail: userEmail,
    });

    if (!savedRefundRequests || savedRefundRequests.length === 0) {
      return res.status(404).json({
        message: "No refund requests found for the provided user email",
      });
    }

    return res.status(200).json(savedRefundRequests);
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//update
export const updateRefundRequest = async (req, res, next) => {
  try {
    if (!req.body.status) {
      return res.status(400).send({
        message: `Send all required fields: status`,
      });
    }

    const { id } = req.params;
    const result = await RefundRequest.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: `Request Not Found` });
    }
    return res
      .status(200)
      .json({ message: `Refund Status updated sucessfully` });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};

//delete the package
export const deleteRefund = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await RefundRequest.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: `Refund Not Found` });
    }
    return res
      .status(200)
      .json({ message: `Refund Request deleted sucessfully` });
  } catch (error) {
    console.log(error.message);
    next(errorHandler(500, { message: error.message }));
  }
};
