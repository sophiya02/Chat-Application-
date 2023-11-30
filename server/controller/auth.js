const ConflictError = require("../error/conflict");
const BadRequestError = require("../error/bad-request");
const User = require("../model/user");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../error");
const io_conn = require('../controller/socket-connection')
const Login = async (req, res, next) => {
  try {
    console.log("login");
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError(
        "Email and Password should not be empty!"
      );
    }
    let user = await User.findOne({ email: email });
    if (!user) {
      throw new UnauthenticatedError("No User Exist, Please Register");
    }
    let isPasswordCorrect = user.passwordValidator(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Password is Incorrect");
    }

    let token = user.createJWT();
    req.session.user = {
      userId: user._id,
      email: user.email
    };
    // console.log("req.server", req.server);
    // io_conn(req.server);
    // console.log("req.session.user",req.session.user)
    // console.log("user",user)
    res.status(StatusCodes.OK).json({ userId: user._id, email: user.email, token, maxAge: process.env.JWT_LIFETIME });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const Register = async (req, res, next) => {
  try {
    console.log("register");
    // console.log('req ', req)
    const { email, password } = req.body;
    if ( email === "" || password === "") {
      throw new BadRequestError(
        "Email and Password should not be empty!"
      );
    }
    let user = await User.findOne({ email: email });
    if (user) {
      console.log("user already exist");
      throw new ConflictError("User Already Exist, Please Try Logging In");
    }
    let userCreated = await User.create({
      authType: "local",
      email: email,
      password: password,
    });
    let token = userCreated.creatJWT();
    res.status(StatusCodes.CREATED).json({user: userCreated});
  } catch (error) {
    console.log(error)
    next(error);
  }
};


const Logout = async (req, res, next) => {
  // console.log("logout initiated");
  // console.log('cookies', req.cookies)
  await req.session.destroy(function () {
    // if(req.cookies['jwt']){
    //   res.clearCookie("jwt" , {domain: 'localhost', path: '/', httpOnly: true});
    // }
    // if(req.cookies['connect.sid']){
    //   res.clearCookie("connect.sid" , {domain: 'localhost', path: '/', httpOnly: true});
    // }
    // req.logout();
    res.status(StatusCodes.OK).json({msg:"Logout Sucessful"});
  });


};

module.exports = {
  Login,
  Register,
  Logout,
};
