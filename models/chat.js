module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });
  return chat;
};
