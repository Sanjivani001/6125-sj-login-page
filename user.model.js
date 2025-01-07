const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

mongoose.connect("mongodb+srv://sanju010305:nwXUcHIa7LdliRzE@cluster1.gqtd9.mongodb.net/loginUser");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Pre-save hook for password hashing
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();  // Only hash the password if it's been modified
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);  // Hash password with salt rounds of 10
    next();
  } catch (error) {
    next(error);  // Handle errors if hashing fails
  }
});

// Instance method to check password correctness
userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);  // Compare plain password with the hashed password
};

const User = mongoose.model('User', userSchema);

module.exports = User;
