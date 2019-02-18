module.exports = (sequelize, DataTypes) => {
  const indexPage = sequelize.define('indexPage', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqGzWfcozC8ACuBwPTbTsMlnRmv-fxwjQTgx_-XFQOaIeXzrKXw',
    },
    testimonial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1],
      },
    },
  });
  return indexPage;
};
