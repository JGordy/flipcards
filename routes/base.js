const express = require("express");
const models = require("../models/index");
const router = express.Router();
const bcrypt = require("bcrypt");

const passport = require('passport');

const isAuthenticated = function (req, res, next) {
  console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }

router.get("/", function(req, res) {

  res.render("signup", {
      messages: res.locals.getMessages()
  });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/decks',
    failureRedirect: '/',
    failureFlash: true
}));

router.get("/signup", isAuthenticated, function(req, res) {
  res.render("signup");
});

router.post("/signup", function(req, res) {
  let username = req.body.username
  let password = req.body.password
  let name     = req.body.name
  let confirmPassword = req.body.confirmPassword

  if (!username || !password) {
    req.flash('error', "Please, fill in all the fields.")
    res.redirect('signup')
  }

  let salt = bcrypt.genSaltSync(10)
  let passwordHash = bcrypt.hashSync(password, salt)

  let newUser = {
    name: name,
    username: username,
    salt: salt,
    password: passwordHash
  }

  if (password === confirmPassword) {

    models.User.create(newUser)
    .then(function() {

      res.redirect("/");
    })
    .catch(function(error) {
      req.flash('error', "Please, choose a different username.")
      res.redirect('/signup')
    });

  } else {
    req.flash("error", "Password does not match")
    res.redirect("/signup")
  }
});


router.get("/decks", isAuthenticated, function(req, res) {

  models.Deck.findAll({
    include: [
      {model: models.Card, as: 'Cards'}
    ]
})
    .then(function(data) {
      if (data) {
        // console.log("yep data: ",data);
        res.render("decks", {decks: data, currentUser: req.user.username})
      } else {
        console.log("nope data");
        res.render("decks");
      }
    })
    .catch(function(err) {
      console.log(err);
      next(err);
    });
});

// create a deck
router.post("/new_deck", isAuthenticated, function(req, res) {
  console.log("req.body: ", req.body);
  models.Deck.create({
    title: req.body.title,
    userId: req.user.id,
    description: req.body.description
  })
  .then(function(data) {
    res.redirect("/decks");
  })
  .catch(function(err) {
    console.log(err);
    res.redirect("/decks");
  })
});


// create a new card in a deck
router.post("/new_card/:id", isAuthenticated, function(req, res) {
  console.log(req.body);
  // models.Card.create




  res.redirect("/decks");
})


module.exports = router;
