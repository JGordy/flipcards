const express = require("express");
const models = require("../models/index");
const router = express.Router();
const passport = require('passport');
const BasicStrategy   = require('passport-http').BasicStrategy;


// √ root end point
router.get("/",  passport.authenticate('basic', {session: false}), function(req, res) {

  res.status(200).send("This is my api documentation. Yeah it's not much, but she's got it where it counts kid");
});


// √ get the collection of created decks
router.get("/decks", passport.authenticate('basic', {session: false}), function(req, res) {

  models.Deck.findAll({})
  .then(function(data) {
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Data not found")
    }
  })
  .catch(function(err) {
    res.status(500).send(err);
  })
});


// √ creating a deck
router.post("/new_deck", passport.authenticate('basic', {session: false}), function(req, res) {

  models.Deck.create({
    title: req.body.title,
    userId: req.user.id,
    description: req.body.description
  })
  .then(function(data) {
    res.status(201).send(data)
  })
  .catch(function(err) {
    res.status(500).send(err)
  })

});


// √ create flipcards within a deck
router.post("/new_card/:id", passport.authenticate('basic', {session: false}), function(req, res) {

  models.Card.create({
    deckId: req.params.id,
    front: req.body.front,
    back: req.body.back,
  })
  .then(function(data) {
    res.status(201).send(data)
  })
  .catch(function(err) {
    res.status(500).send(err)
  })
});


// √ edit a single flipcard within a deck
router.put("/edit_flipcard/:deckId/:id", passport.authenticate('basic', {session: false}), function(req, res) {

  models.Card.update({
    front: req.body.front,
    back: req.body.back
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(function(data) {
    res.status(201).send(data)
  })
  .catch(function(err) {
    res.status(500).send(err)
  })
});


// √ removing a single flipcard from a deck
router.delete("/remove/:deckId/:id", passport.authenticate('basic', {session: false}), function(req, res) {

  models.Card.findOne({
    where: {id: req.params.id}
  })
  .then(function(data) {
    models.Card.destroy({
      where: {id: req.params.id}
    })
    .then(function(data) {
      res.sendStatus(200).send(data);
    })
    .catch(function(err) {
      res.status(500).send(err)
    })
  })
  .catch(function(err) {
    res.status(500).send(err)
  })

});

module.exports = router;
