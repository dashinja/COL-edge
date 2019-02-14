module.exports = function(sequelize, DataTypes) {
  var major = sequelize.define(
    "major",
    {
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
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return major;
};
