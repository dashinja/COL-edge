module.exports = function(sequelize, DataTypes) {
  var Major = sequelize.define("Major", {
    major: {
      type: DataTypes.STRING,
      allowNull: false
    },
    starting_salary: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    mid_career_salary: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });
  return Major;
};
