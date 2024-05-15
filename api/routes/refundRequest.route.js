import express from "express";
import {
  createRefundRequest,
  getRefundRequests,
  getIdSRefunds,
  updateRefundRequest,
  deleteRefund,
  getIdSRefundsUserEmail,
} from "../controllers/refundRequest.controller.js";

const router = express.Router();

router.post("/addRefunds", createRefundRequest);
router.get("/getRefunds", getRefundRequests);
router.get("/refundRequest/:id", getIdSRefunds);
router.put("/updateRefund/:id", updateRefundRequest);
router.get("/getByUserRefunds/:userEmail", getIdSRefundsUserEmail);
router.delete("/deleteRefund/:id", deleteRefund);

export default router;
