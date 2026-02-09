import express from "express";

import { body, param } from "express-validator";

import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/orderController.js";

import { protect} from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

router.get("/", protect, getOrders);

router.post("/", protect, createOrder);

router.put("/:id", protect, [param("id").isMongoId()], updateOrder);

// !!! IMPORTANT: This route has 'adminOnly'. 
// Normal staff/manager users will get a 403 Forbidden error when trying to delete.
router.delete("/:id", protect, [param("id").isMongoId()], deleteOrder);

export default router;
