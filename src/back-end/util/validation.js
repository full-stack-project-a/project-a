// Email validation function
const validateEmail = (email) => {
   if (!email) return "Email cannot be empty!";
   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email input!";
   return ""; // No error
};

// Password validation function
const validatePassword = (password) => {
   if (!password) return "Password cannot be empty.";
   if (password.length < 8) return "Password must be at least 8 characters long.";
   if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
   if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
   if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
   return ""; // No error
};


module.exports = {
   validateEmail,
   validatePassword,
}