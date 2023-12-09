const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

const userSchema = new Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: "user",
      enum: ['user', 'admin']
   },
});

// pre-hash password before store to db
userSchema.pre('save', next => {
   if (!this.isModified('password')) return next();
   try {
      const hash = crypto.createHash('sha256').update(this.password).digest('hex');
      this.password = hash;
      next();
   } catch (err) {
      console.log("error saving password: ", err);
      next(err);
   }
})

// create models
const User = mongoose.model('User', userSchema);

// exports
module.exports = {
   User
}