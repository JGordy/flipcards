'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Deck, {
      as: "Decks",
      foreignKey: "userId"
    })
  };

  return User;
};
