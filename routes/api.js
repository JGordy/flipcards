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
      data = {"status": "success", data: data};
      res.status(200).json(data);
    } else {
      res.status(404).send("Data not found")
    }
  })
  .catch(function(err) {
    err = {"status": "fail", error: err};
    res.status(500).json(err);
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
    data = {"status": "success", data: data};
    res.status(200).send(data)
  })
  .catch(function(err) {
    err = {"status": "fail", error: err};
    res.status(500).json(err)
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
    data = {"status": "success", data: data};
    res.status(201).json(data)
  })
  .catch(function(err) {
    err = {"status": "fail", error: err};
    res.status(500).json(err)
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
    data = {"status": "success", data: data};
    res.status(201).json(data)
  })
  .catch(function(err) {
    err = {"status": "fail", error: err};
    res.status(500).json(err)
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
      data = {"status": "success", data: data};
      res.sendStatus(200).json(data);
    })
    .catch(function(err) {
      err = {"status": "fail", error: err};
      res.status(500).json(err)
    })
  })
  .catch(function(err) {
    err = {"status": "fail", error: err};
    res.status(500).json(err)
  })

});

module.exports = router;
