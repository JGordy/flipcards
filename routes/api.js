const express = require("express");
const models = require("../models/index");
const router = express.Router();

const datahere = {
  id: 1,
  username: "Joe",
  password: "sldkfjlskdjfweeee5bb6bb54n",
  salt: "ssldkvj6nn4399",
  favColor: "green",
  admin: false
}

router.get("/api/bro", function(req, res) {
  res.status(200).json(datahere);
});

router.post("/new_card/:id", function(req, res) {

  models.Card.create({
    deckId: req.params.id,
    front: req.body.front,
    back: req.body.back,
  })
  .then(function(data) {
    res.send(201).json(data);
  })
  .catch(function(err) {
    res.send(500).json(err);
  });

});

module.exports = router;
