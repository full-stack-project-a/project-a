const { User } = require("../models/userSchema");
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

   // if there isn't any token, return 400
   if (token == null) {
      return res.status(400).json({ message: "Bad Request: No token received." });
   }

   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // if token is no longer valid
      if (err) return res.status(403).json({ message: "Forbidden: Token no longer valid." });
      req.user = user;
      next();
   });
};


/**
 * Middleware to verify user's role and provide role-based access control.
 * 
 * @param {String} requiredRole - The role required to access the route ('public', 'authenticated', 'vendor').
 * 
 * Functionality:
 * - Returns a 400 error if an invalid role is specified.
 * - Allows public access without authentication if requiredRole is 'public'.
 * - For 'authenticated' and 'vendor' roles, checks if the user is logged in.
 * - If the user is logged in, further checks if their role matches the requiredRole.
 * - If the user's role does not match, or if no user is found, returns a 403 (Forbidden) or 401 (Unauthorized) error.
 * - If the user has the required role, proceeds to the next middleware.
 * 
 * Note: This middleware assumes that req.user is populated by previous authentication middleware.
 */
const verifyTokenAndRole = (requiredRole) => async (req, res, next) => {
   // Validate requiredRole parameter
   if (!['public', 'authenticated', 'vendor'].includes(requiredRole)) {
      console.log("Midleware Error: Invalid role specified");
      return res.status(400).json({ message: "Bad Request: Invalid role specified" });
   }

   // Public access doesn't require authentication
   if (requiredRole === 'public') {
      return next();
   }

   // Check if user is logged in for authenticated access
   if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: User is not logged in." });
   }

   try {
      const userId = req.user.userId;
      const user = await User.findById(userId);

      // Ensure the user exists in database
      if (!user) {
         return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      // Verify user's role for vendor and authenticated routes
      if ((requiredRole === 'vendor' && user.role !== 'vendor') ||
         (requiredRole === 'authenticated' && !['customer', 'vendor'].includes(user.role))) {
         return res.status(403).json({ message: "Forbidden: Insufficient permissions." });
      }

      // User has the required role
      next();
   } catch (err) {
      return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
   }
};


module.exports = {
   authenticateToken,
   verifyTokenAndRole
}