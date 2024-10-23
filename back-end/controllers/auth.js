const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator");

const User = require("../models/user");

exports.signup = (req, res, next) => {
    const errors  = validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.statusCode = 422;
        error.data = errors.array()
        throw error; // throw for sync code
      }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
}