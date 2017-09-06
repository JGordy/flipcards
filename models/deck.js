'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});

  Deck.associate = function(models) {
    Deck.belongsTo(models.User, {
      as: "Users",
      foreignKey: "userId"
    })
  Deck.hasMany(models.Card, {
    as: "Cards",
    foreignKey: "deckId"
  })
  }

  return Deck;
};
