import express from "express";
import { body, param } from "express-validator";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/inventoryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getItems);

router.post(
  "/",
  protect,
  [
    body("sku").notEmpty(),
    body("title").notEmpty(),
    body("platform").optional().isIn(["amazon", "flipkart", "shopify", "other"]),
    body("quantity").optional().isNumeric(),
  ],
  createItem
);

router.put(
  "/:id",
  protect,
  [param("id").isMongoId()],
  updateItem
);

router.delete("/:id", protect, adminOnly, [param("id").isMongoId()], deleteItem);

export default router;

