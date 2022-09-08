const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      { productId: { type: String }, quantity: { type: Number, default: 1 }, size: {type: String}, color: {type: String} },
    ],
    total: {type: Number, default: 0}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
