module.exports = function(sequelize, DataTypes) {
  var Cost = sequelize.define("Cost", {
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cli_including_rent: {
      type: DECIMAL,
      allowNull: false
    },
    cli: {
      type: DECIMAL,
      allowNull: false
    }
  });
  return Cost;
};
