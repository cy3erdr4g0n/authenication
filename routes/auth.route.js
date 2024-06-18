const express = require("express")

const router = express.Router()

const { sigup,
     ActivateUser, 
     changePassword, 
     login, 
     forgetenPassword,
     requestForOtp,
     resetPassword} = require("./../controllers/auth.controllers")

const validate = require("../middlerwares/Useremail")


router.post("/auth/registration", sigup); 
router.post("/auth/activate", [validate.validateEmail, ActivateUser]);
router.post("/auth/otp", [validate.validateEmail, requestForOtp]); 
router.post("/recover", [validate.validateEmail, forgetenPassword]); 
router.get("/reset/:userId/:token");
router.post("/reset/:userId/:token", [validate.validatePassword, resetPassword]);
router.post("/change/password", [validate.validatePassword, changePassword]);
router.post("/auth/login", login);

module.exports = router