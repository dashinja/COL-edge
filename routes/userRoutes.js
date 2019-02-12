var express = require("express");
var userRouter = express.Router();

// userRouter.use("/", (req, res, next) => {
//   if (!req.user) {
//     res.redirect("/");
//   }
//   next();
// });

userRouter.get("/", (req, res, next) => {
  res.render(
    "users",
    req /* {
    user: {
      name: req.user.displayName,
      image: req.user._json.image.url
    }
  } */
  );
  console.log(req.body);
});

module.exports = userRouter;
