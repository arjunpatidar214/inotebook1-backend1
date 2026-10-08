const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'arjun_2748462patidar'; // my secret key for JWT token generation

// create user using: POST "/api/auth/createuser". No login required  
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) =>{
  // if errors return bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ error: "User with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({ ...req.body, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Some error occurred");
  }
});

module.exports = router; 