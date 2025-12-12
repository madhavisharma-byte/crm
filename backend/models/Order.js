import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, trim: true },
    platform: {
      type: String,
      enum: ["amazon", "flipkart", "shopify", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    items: [
      {
        sku: String,
        quantity: Number,
        price: Number,
      },
    ],
    total: { type: Number, default: 0 },
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

