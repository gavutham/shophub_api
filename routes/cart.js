const Cart = require("../models/Cart");
const { verify, verifyAndAuth, verifyAndAuthAdmin } = require("./verifyToken");
const cryptojs = require("crypto-js").AES;
const router = require("express").Router();

//Create
router.post("/", verify, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put("/:id", verify, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete("/:id", verify, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId});

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all 
router.get("/", verifyAndAuthAdmin, async (req, res) => {
  
  try {
    const carts = Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
