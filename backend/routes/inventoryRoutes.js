import express from "express";
import { body } from "express-validator";
import {
  getInventory,
  getInventoryStats,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Removed protect from getInventory route
router.get("/", getInventory);

router.get("/stats", protect, getInventoryStats);

router.post(
  "/",
  protect,
  [
    body("title").notEmpty(),
    body("sku").notEmpty(),
    body("price").isFloat({ gt: 0 }),
    body("quantity").isInt({ min: 0 }),
  ],
  addInventoryItem
);

router.put(
  "/:id",
  protect,
  [
    body("price").optional().isFloat({ gt: 0 }),
    body("quantity").optional().isInt({ min: 0 }),
    body("title").optional().notEmpty(),
  ],
  updateInventoryItem
);

router.delete("/:id", protect, deleteInventoryItem);

export default router;
