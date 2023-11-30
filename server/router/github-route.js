const router = require("express").Router();
const passport = require("passport");
const User = require("../model/user");

const GithubStrategy = require("passport-github2").Strategy;

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/auth/github/callback",
      scope: ["user:email"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        console.log("user doesnot exist");
        let createdUser = await User.create({
          authType: "github",
          githubId: profile.id ?? "",
          displayName: profile.displayName ?? "",
          image_url: profile.photos[0].value ?? "",
        });
        return cb(null, createdUser);
      } else console.log("user exist");
      // console.log("profile: ", profile)
      // return cb(null, profile);
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

router.route("/").get(passport.authenticate("github"));
router
  .route("/callback")
  .get(
    passport.authenticate("github", { failureRedirect: "/api/v1/auth/login" }),
    (req, res) => {
      res.json({ user: req.user });
    }
  );

module.exports = router;
