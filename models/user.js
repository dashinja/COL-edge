module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      // For picture we will have them submit a link to a picture so we can save it as a string.
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // User choice of college: placeholder for icebox
      collegeChoice: {
        type: DataTypes.STRING,
        allowNull: true
      },
      // User choice of major
      majorChoice: {
        type: DataTypes.STRING,
        allowNull: true
      },
      // User choice of living place
      cityChoice: {
        type: DataTypes.STRING,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      freezeTableName: true
    }
  );
  return User;
};
