const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authToken = req.headers.token;
  if (authToken) {
    jwt.verify(authToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(403).json("not authed");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).json("no token provided");
  }
};

const verifyAndAuth = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      console.log(req.user.id);
      console.log(req.params.id);
      res.status(403).json(req.params.id);
    }
  });
};

const verifyAndAuthAdmin = (req, res, next) => {
  verify(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Authorization denied");
    }
  });
};

module.exports = { verify, verifyAndAuth, verifyAndAuthAdmin };
