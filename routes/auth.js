const router = require("express").Router();
const User = require("../models/User");
const cryptojs = require("crypto-js").AES;
const cryptoencode = require("crypto-js").enc.Utf8;
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptojs
      .encrypt(req.body.password, process.env.PASSWORD_SECRET)
      .toString(),
    img: req.body.img,
  });

  try {
    savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(401).json("wrong credentials, user don't exist");
    } else {
      const hash = cryptojs
        .decrypt(user.password, process.env.PASSWORD_SECRET)
        .toString(cryptoencode);

      if (hash != req.body.password) {
        res.status(401).json("wrong credentials, please check the password");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SECRET,
          { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ others, accessToken });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
