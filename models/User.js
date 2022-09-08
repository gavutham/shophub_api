const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    img: {type: String, default: ""}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
