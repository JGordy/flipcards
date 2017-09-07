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

module.exports = router;
