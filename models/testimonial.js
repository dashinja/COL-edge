module.exports = (sequelize, DataTypes) => {
  const testimonial = sequelize.define('testimonial', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      },
      unique: {
        args: true,
        msg: 'User has already submitted a testimonial.'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqGzWfcozC8ACuBwPTbTsMlnRmv-fxwjQTgx_-XFQOaIeXzrKXw'
    },
    testimonial: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1]
      }
    },
    onIndexPage: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return testimonial;
};
