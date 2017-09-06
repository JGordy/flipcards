'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    deckId: DataTypes.INTEGER,
    front: DataTypes.STRING,
    back: DataTypes.STRING
  }, {});

  Card.associate = function(models) {
    Card.belongsTo(models.Deck, {
      as: "Decks",
      foreignKey: "deckId"
    })
  }

  return Card;
};
