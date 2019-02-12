module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // For picture we will have them submit a link to a picture so we can save it as a string.
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};
