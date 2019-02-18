module.exports = function(sequelize, DataTypes) {
  var note = sequelize.define('note', {
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1],
      },
      unique: {
        args: true,
        msg: 'Username already in use!',
      },
    },
    localUsername: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1],
      },
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });
  return note;
};
