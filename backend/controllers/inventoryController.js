import Inventory from "../models/InventoryItem.js";
import { validationResult } from "express-validator";

// @desc    Get Inventory Stats
// @route   GET /api/inventory/stats
export const getInventoryStats = async (req, res) => {
  try {
    const stats = await Inventory.aggregate([
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                totalProducts: { $sum: "$quantity" },
                // Calculate Total Value based on SELLING PRICE * QUANTITY
                totalValue: { $sum: { $multiply: ["$quantity", "$price"] } },
                // Optional: Calculate Potential Profit (Selling - Cost)
                totalCost: { $sum: { $multiply: ["$quantity", "$costPrice"] } },
                uniqueSkuCount: { $sum: 1 },
              },
            },
          ],
          lowStock: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $gt: ["$quantity", 0] },
                    { $lte: ["$quantity", "$lowStockThreshold"] },
                  ],
                },
              },
            },
            { $count: "count" },
          ],
          outOfStock: [
            { $match: { quantity: 0 } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const result = stats[0];
    const totals = result.totals[0] || {};

    res.json({
      totalProducts: totals.totalProducts || 0,
      totalValue: totals.totalValue || 0,
      totalCost: totals.totalCost || 0, // You can use this to show "Inventory Cost" vs "Sales Value"
      totalSkus: totals.uniqueSkuCount || 0,
      lowStock: result.lowStock[0]?.count || 0,
      outOfStock: result.outOfStock[0]?.count || 0,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};

// @desc    Add new inventory item
// @route   POST /api/inventory
export const addInventoryItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // 1. Destructure the payload sent from Frontend
    const { 
      sku, 
      title, 
      quantity, 
      price, // This is Selling Price from frontend
      metadata 
    } = req.body;

    // 2. Check for duplicate SKU
    const existing = await Inventory.findOne({ sku });
    if (existing) {
      return res.status(400).json({ message: "SKU already exists. Please use a unique SKU." });
    }

    // 3. Extract nested metadata fields to map to Root Schema fields
    // Frontend sends 'category' inside metadata, but we want it at root for indexing
    const category = metadata?.category || "Uncategorized";
    const costPrice = parseFloat(metadata?.costPrice) || 0;
    const mrp = parseFloat(metadata?.mrp) || 0;

    // 4. Create Item
    const item = await Inventory.create({
      title,
      sku,
      category,
      quantity: Number(quantity),
      price: Number(price), // Selling Price
      costPrice: costPrice,
      mrp: mrp,
      lowStockThreshold: 10, // Default
      metadata: {
        customerGroup: metadata.customerGroup,
        paymentMethod: metadata.paymentMethod,
        amazonSku: metadata.amazonSku,
        flipkartSku: metadata.flipkartSku,
        meeshoSku: metadata.meeshoSku,
        otherSku: metadata.otherSku,
        description: metadata.description
      }
    });

    res.status(201).json({ message: "Product added successfully", item });
  } catch (err) {
    console.error("Add Inventory Error:", err);
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};

// ... (Get, Update, Delete controllers remain same)
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory", error: err.message });
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
