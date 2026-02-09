import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
      index: true,
    },
    // Current Stock
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    // SELLING PRICE (The price the customer pays)
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Extra pricing details
    costPrice: {
      type: Number,
      default: 0,
    },
    mrp: {
      type: Number,
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
    },
    // Flexible metadata for specific business logic
    metadata: {
      customerGroup: String,
      description: String,
      paymentMethod: [String], // Array of strings (Cash, UPI, etc)
      // Platform specific SKUs
      amazonSku: String,
      flipkartSku: String,
      meeshoSku: String,
      otherSku: String,
    },
  },
  { timestamps: true }
);

// Text Index for searching
inventorySchema.index({ title: "text", sku: "text" });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
