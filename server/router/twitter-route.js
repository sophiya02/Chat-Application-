const router = require("express").Router();
const passport = require("passport");
const User = require("../model/user");

const TwitterStrategy = require("passport-twitter").Strategy;

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/auth/twitter/callback",
      // scope: ['profile']
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        // let user = await User.findOne({twitterId: profile.id});
        // if(!user){
        //   console.log("user doesnot exist")
        //   let createdUser = await User.create({
        //     authType: 'twitter',
        //     twitterId: profile.id ?? "",
        //     displayName: profile.displayName ?? "",
        //     firstname: profile.name.givenName ?? "",
        //     lastname: profile.name.familyName ?? "",
        //     image_url:profile.photos[0].value ?? ""
        //   })
        //   return cb(null, profile);
        // }
        // else console.log("user exist")
        console.log("profile: ", profile);
        return cb(null, profile);
        // return cb(null, user);
      } catch (error) {
        cb(error);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user.id);
  });
});

passport.deserializeUser(function (id, cb) {
  process.nextTick(function () {
    return cb(null, id);
  });
});

router.route("/").get(passport.authenticate("twitter"));
router
  .route("/callback")
  .get(
    passport.authenticate("twitter", { failureRedirect: "/api/v1/auth/login" }),
    (req, res) => {
      res.json({ id: req.id });
    }
  );

module.exports = router;
