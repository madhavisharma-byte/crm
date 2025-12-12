import express from "express";
import { body, param } from "express-validator";
import {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getOrders);

router.post(
  "/",
  protect,
  [
    body("orderNumber").notEmpty(),
    body("platform").optional().isIn(["amazon", "flipkart", "shopify", "other"]),
    body("status").optional().isIn([
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ]),
  ],
  createOrder
);

router.put("/:id", protect, [param("id").isMongoId()], updateOrder);

router.delete("/:id", protect, adminOnly, [param("id").isMongoId()], deleteOrder);

export default router;

