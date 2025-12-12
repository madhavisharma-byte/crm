import { validationResult } from "express-validator";
import InventoryItem from "../models/InventoryItem.js";

export const getItems = async (_req, res) => {
  try {
    const items = await InventoryItem.find().sort({ updatedAt: -1 });
    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory", error: err.message });
  }
};

export const createItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const item = await InventoryItem.create({
      ...req.body,
      owner: req.user?._id,
    });
    res.status(201).json({ item });
  } catch (err) {
    res.status(500).json({ message: "Failed to create item", error: err.message });
  }
};

export const updateItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const item = await InventoryItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ item });
  } catch (err) {
    res.status(500).json({ message: "Failed to update item", error: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item", error: err.message });
  }
};

