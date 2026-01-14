// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
  try {
    // Look up the user from req.session
    // const currentUser = await User.findById(req.session.user._id);
    
    // Render new.ejs, passing in all of the current user's
    // applications as data in the context object.
    res.render('foods/index.ejs');
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new' , (req, res) => {
  res.render('new.ejs');
});

module.exports = router;