module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1]
        },
        unique: {
          args: true,
          msg: 'Username already in use!'
        }
      },
      // For picture we will have them submit a link to a picture so we can save it as a string.
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // User choice of college: placeholder for icebox
      // collegeChoice: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
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
      stateChoice: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Notes: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      freezeTableName: true
    }
  );
  return user;
};
