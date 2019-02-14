module.exports = function(sequelize, DataTypes) {
  var cost = sequelize.define(
    "cost",
    {
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
      cli_plus_rent: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      cli: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return cost;
};
