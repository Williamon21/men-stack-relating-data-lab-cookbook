// controllers/foods.js
const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user.js');

// INDEX - show all pantry items
// GET /users/:userId/foods
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.locals.pantry = currentUser.pantry;
    res.render('foods/index.ejs');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// NEW - show form
// GET /users/:userId/foods/new
router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});

// CREATE - add item to pantry array
// POST /users/:userId/foods
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    if (!currentUser.pantry) currentUser.pantry = [];
    currentUser.pantry.push(req.body);
    await currentUser.save();

    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});



// DELETE - remove one item
// DELETE /users/:userId/foods/:itemId
router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.itemId).deleteOne();
    await currentUser.save();

    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});


// EDIT - show edit form for one item
// GET /users/:userId/foods/:itemId/edit
router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.itemId);
    res.locals.food = food;
    res.render('foods/edit.ejs');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// UPDATE - update one item
// PUT /users/:userId/foods/:itemId
router.put('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const food = currentUser.pantry.id(req.params.itemId);
    food.set(req.body);
    await currentUser.save();

    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});


module.exports = router;
