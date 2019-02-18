module.exports = function(sequelize, DataTypes) {
  var majorSalaries = sequelize.define(
    'majorSalaries',
    {
      major: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startingSalary: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      midCareerSalary: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return majorSalaries;
};
