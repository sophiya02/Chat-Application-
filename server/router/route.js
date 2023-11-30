const router = require("express").Router();
const { Login, Register, Logout } = require("../controller/auth");

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/logout").get(Logout);

module.exports = router;
