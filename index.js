const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
var cors = require('cors');


dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);

app.use("/api/user", userRoute);

app.use("/api/product", productRoute);

app.use("/api/cart", cartRoute);

app.use("/api/orders", orderRoute);


app.listen(process.env.PORT || 7000, () => {
  console.log("server running at port 7000");
});
