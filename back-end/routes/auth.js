const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth")

const router = express.Router();

// router.get('')

router.put(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid Email")
      .normalizeEmail({
        gmail_convert_googlemaildotcom: false,
        gmail_remove_dots: false,
        gmail_remove_subaddress: false,
      })
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      }),
    body("password")
      .trim()
      .isStrongPassword()
      .withMessage(
        `Password must be at least 8 characters long and include at least one uppercase letter,
         one lowercase letter, one number, and one special character`
      ),
  ],
  authController.signup
);

router.post("/login", authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch(
  '/status',
  isAuth,
  [
    body('status')
      .trim()
      .not()
      .isEmpty()
  ],
  authController.updateUserStatus
);

module.exports = router;
