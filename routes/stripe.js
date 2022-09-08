// const router = require("express").Router();
// const stripe = require("stripe")("sk_test_51Lc8KuSDkcS43uNfFPQsoz6LRmO3jElGjafFw4wD1gyq6n4OE9IMsRKr4nHDjXffNJLlB0qJaRNgmudrxhiVxPdB00OY5XAzYT");

// router.post("/payment", (req, res) => {
//   console.log(req.body.amount);
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount * 100,
//       currency: "inr",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).json(stripeErr);
//       } else {
//         res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

// module.exports = router;
