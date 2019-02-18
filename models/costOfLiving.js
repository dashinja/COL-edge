module.exports = function(sequelize, DataTypes) {
  const costOfLiving = sequelize.define(
    'costOfLiving',
    {
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      costOfLivingIndex: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      rentIndex: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      costOfLivingPlusRent: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      groceriesIndex: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      restaurantPriceIndex: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      localPurchasingPowerIndex: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      milk: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      monthlyPass: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      oneBedApartmentInCityCentre: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      tenMbpsInternet: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      cappuccino: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      smallBottleOfWater: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      dozenEggs: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      bigBottleOfWater: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      domesticBeer: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      localOneWayTicket: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      basicUtilitiesForApartment: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      cinemaTicket: {
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      apples: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return costOfLiving;
};
