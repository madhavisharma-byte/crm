import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, trim: true },
    title: { type: String, required: true },
    platform: {
      type: String,
      enum: ["amazon", "flipkart", "shopify", "other"],
      default: "other",
    },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    metadata: { type: Object },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

export default InventoryItem;

