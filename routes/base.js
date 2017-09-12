const express = require("express");
const models  = require("../models/index");
const router  = express.Router();
const bcrypt  = require("bcrypt");

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
    where: {userId: req.user.id},
    order: [['createdAt', 'DESC']],
    include: [
      {model: models.Card, as: 'Cards'}
    ]
})
    .then(function(data) {
      if (data) {
        res.render("decks", {decks: data, currentUser: req.user.username})
      } else {
        res.render("decks");
      }
    })
    .catch(function(err) {
      next(err);
    });
});

// create a deck
router.post("/new_deck", isAuthenticated, function(req, res) {

  models.Deck.create({
    title: req.body.title,
    userId: req.user.id,
    description: req.body.description
  })
  .then(function(data) {
    res.redirect("/decks");
  })
  .catch(function(err) {
    res.redirect("/decks");
  })
});

// create a new card in a deck
router.post("/new_card/:id", isAuthenticated, function(req, res) {

  models.Card.create({
    deckId: req.params.id,
    front: req.body.front,
    back: req.body.back,
  })
  .then(function(data) {
    res.redirect("/decks");
  })
  .catch(function(err) {
    res.redirect("/decks")
  });

});

router.post("/new_card_header/:id", isAuthenticated, function(req, res) {

  models.Card.create({
    deckId: req.params.id,
    front: req.body.front,
    back: req.body.back,
  })
  .then(function(data) {
    res.redirect(`/cards/${req.params.id}`);
  })
  .catch(function(err) {
    res.redirect("/cards/:id")
  });

});

// route to the card list page
router.get("/cards/:id", isAuthenticated, function(req, res) {

  models.Card.findAll({
    where: {deckId: req.params.id},
    include: [
      {model: models.Deck, as: 'Decks'}
    ]
  })
  .then(function(data) {

    res.render("flipcards", {cards: data, thisDeckId: req.params.id, currentUser: req.user.username});
  })
  .catch(function(err) {
    res.redirect("/decks");
  })

})

// editing a flipcard
router.post("/edit_flipcard/:deckId/:id", isAuthenticated, function(req, res) {

  models.Card.update({
    front: req.body.front,
    back: req.body.back
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(function(data) {
    res.redirect(`/cards/${req.params.deckId}`);
  })
  .catch(function(err) {
    res.redirect(`/cards/${req.params.deckId}`);
  })
});

// deleting a flipcard
router.get("/remove/:deckId/:id", isAuthenticated, function(req, res) {

  models.Card.destroy({
    where: {id: req.params.id}
  })
  .then(function(data) {
    res.redirect(`/cards/${req.params.deckId}`);
  })
  .catch(function(err) {
    res.redirect(`/cards/${req.params.deckId}`);
  })
});

// starting a quiz with a particular deck
router.get("/quiz/:deckId", isAuthenticated, function(req, res) {
  console.log(req.params.deckId);
  models.Card.findAll({
    where: {
      deckId: req.params.deckId
    }
  })
  .then(function(data) {
    res.render("quiz", {cards: data, user: req.user.username})
  })
})


router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
