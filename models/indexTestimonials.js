module.exports = (sequelize, DataTypes) => {
  const indexTestimonial = sequelize.define('indexTestimonial', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
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
    }
  });
  return indexTestimonial;
};
