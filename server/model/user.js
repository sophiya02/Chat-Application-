const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Channel = require('./channel')

const UserSchema = new mongoose.Schema(
  {
    authType: {
      type: String,
      enum: ["local", "google", "github", "twitter"],
      // default: 'local',
      required: [true, "Please mention the authType"],
    },
    email: {
      type: String,
      required: [
        function(){ this.authType === "local"},
        "Please provide the email ID",
      ],
    },
    password: {
      type: String,
      required: [
        function(){ this.authType === "local"},
        "Please provide the password",
      ],
    },

    // googleId: {
    //   type: String,
    //   required: [
    //     function(){ this.authType === "google"},
    //     "Please provide the google ID",
    //   ],
    // },
    // githubId: {
    //   type: String,
    //   required: [
    //     function(){ this.authType === "github"},
    //     "Please provide the github ID",
    //   ],
    // },
    // twitterId: {
    //   type: String,
    //   required: [
    //     function(){ this.authType === "twitter"},
    //     "Please provide the twitter ID",
    //   ],
    // },

    image_url: {
      type: String,
    },
    bio: {
      type: String,
    },
    channels: [
      {
        channelId:{
          type: mongoose.Schema.Types.ObjectId, ref:'Channel'
        },
        role:{
          type: String,
          enum: ['admin', 'user'],
          default: 'user'
        },
        channel_name: {
          type: String
        },
        channel_image_url: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  if (this.authType === "local") {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.createJWT = function(){
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.passwordValidator = function (password) {
  if (this.authType === "local") {
    let isMatch = bcrypt.compare(password, this.password);
    return isMatch;
  }
};

module.exports = mongoose.model("User", UserSchema);
