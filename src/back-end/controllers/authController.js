const { User } = require("../models/userSchema");
const crypto = require('crypto');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { validateEmail, validatePassword } = require('../util/validation');

// render handling methods
const handleSignup = async (req, res) => {
   try {
      console.log("req:", req);
      const { username, password, role = "customer" } = req.body;

      // Validate email and password
      const emailError = validateEmail(username);
      const passwordError = validatePassword(password);

      if (emailError || passwordError) {
         return res.status(400).json({
            message: 'Validation failed',
            errors: { username: emailError, password: passwordError }
         });
      }

      // check whether user already exists
      const user = await User.findOne({ username });
      if (user) {
         return res.status(400).json({ message: 'User exists.' })
      }

      // create new user & save to db
      const newUser = new User({ username, password, role });
      await newUser.save();

      // send jwt token & render
      const token = generateToken(newUser);
      res.status(201).json({
         message: 'User successfully registered',
         token: token,
         user: { username: newUser.username, role: newUser.role }
      });
   } catch (err) {
      if (err.message === "User validation failed: role: `other` is not a valid enum value for path `role`.") {
         return res.status(400).json({ message: "Invalid role." });
      }
      res.status(500).json({ error: err.message });
   }
}

const handleSignin = async (req, res) => {
   try {
      const { username, password } = req.body;
      if (username && password) {
         // validate user credential (username & password)
         const user = await User.findOne({ username });
         const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
         if (!user || (user.password !== hashedPassword)) {
            return res.status(401).json({ message: "Invalid username or password" });
         }

         // generate JWT token as proof of auth
         const token = generateToken(user);

         // resolve & send response
         res.json({
            message: 'Authentication success',
            token: token,
            user: { username: user.username, role: user.role }
         })
      } else {
         return res.status(401).json({ message: "Invalid username or password" });
      }
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

const handleUpdatePassword = async (req, res) => {
   try {
      const { email } = req.body;
      const user = await User.findOne({ username: email });
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Password update success" });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
}

// utility functions
/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object.
 * @returns {string} The generated JWT token.
 */
const generateToken = (user) => {
   return jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
   );
};

// database methods

module.exports = {
   handleSignup,
   handleSignin,
   handleUpdatePassword,
}