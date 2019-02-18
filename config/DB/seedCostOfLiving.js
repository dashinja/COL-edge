const fs = require('fs');
const db = require('../../models');

fs.readFile('./cost-of-living-2016.csv', 'utf8', (err, data) => {
  let createdModels = [];
  data
    .split('\n')
    .map(r => r.split(','))
    .filter(r => r[1].length === 2)
    .forEach(row => {
      createdModels.push(
        db.costOfLiving.create({
          city: row[0],
          state: row[1],
          costOfLivingIndex: row[2],
          rentIndex: row[3],
          costOfLivingPlusRent: row[4],
          groceriesIndex: row[5],
          restaurantPriceIndex: row[6],
          localPurchasingPowerIndex: row[7],
          milk: row[8],
          monthlyPass: row[9],
          oneBedApartmentInCityCentre: row[10],
          tenMbpsInternet: row[11],
          cappuccino: row[12],
          smallBottleOfWater: row[13],
          dozenEggs: row[14],
          bigBottleOfWater: row[15],
          domesticBeer: row[16],
          localOneWayTicket: row[17],
          basicUtilitiesForApartment: row[18],
          cinemaTicket: row[19],
          apples: row[20],
        })
      );
    });
  Promise.all(createdModels).then(() => {
    process.exit();
  });
});
