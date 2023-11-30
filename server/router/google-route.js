const router = require("express").Router();
const passport = require("passport");
const User = require("../model/user");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
      scope: ["profile"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        console.log("user doesnot exist");
        let createdUser = await User.create({
          authType: "google",
          googleId: profile.id ?? "",
          displayName: profile.displayName ?? "",
          image_url: profile.photos[0].value ?? "",
        });
        return cb(null, createdUser);
      } else console.log("user exist");
      return cb(null, user);
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.route("/").get(passport.authenticate("google"));
router
  .route("/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/api/v1/auth/login" }),
    (req, res) => {
      res.json({ user: req.user });
    }
  );

module.exports = router;
