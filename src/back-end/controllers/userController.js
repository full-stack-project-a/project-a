const { User } = require("../models/userSchema");

// return 403 if "user"
// return 401 if not logged in or no user
// return 500 for server error
// pass to next middleware of "vendor"
const checkVendorRole = async (req, res, next) => {
   if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User is not logged in." });
   }

   try {
      const userId = req.user.id;
      const user = await User.findById(userId);

      if (!user) {
         return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      switch (user.role) {
         case "vendor":
            next();
            break;
         case "customer":
            return res.status(403).json({ message: "Forbidden: You don't have permission to create a product." });
         default:
            // Handle unexpected roles
            return res.status(403).json({ message: "Forbidden: Invalid user role." });
      }
   } catch (err) {
      return res.status(500).json({ message: `${err.message}` });
   }
};

module.exports = {
   checkVendorRole
}