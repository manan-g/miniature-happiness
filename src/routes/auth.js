const express = require("express");
const {
    login,
    register,
    logout,
    check_not_auth,
    check_auth,
    getUser,
} = require("../controller/auth");
const router = express.Router();

//login route username,password
router.post("/login", check_not_auth, login);

router.get("/logout", check_auth, logout);
router.get("/getuser", check_auth, getUser);

//register
router.post("/signup", check_not_auth, register);

module.exports = router;
