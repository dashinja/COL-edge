module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          len: [1]
        },
        unique: {
          args: true,
          msg: 'Username already in use!'
        }
      },
      localUsername: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          len: [1]
        },
        unique: {
          args: true,
          msg: 'Username already in use!'
        }
      },
      localPassword: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        validate: {
          len: [6]
        }
      },
      // For picture we will have them submit a link to a picture so we can save it as a string.
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqGzWfcozC8ACuBwPTbTsMlnRmv-fxwjQTgx_-XFQOaIeXzrKXw'
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
      notes: {
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
