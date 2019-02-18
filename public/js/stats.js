$(function() {
  const ctx = document.getElementById('myChart');
  const userInfo = {
    user: {},
    city: {},
  };
  let newDataSet = arr => {
    return {
      data: arr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    };
  };

  $.ajax({
    type: 'GET',
    url: '/api/user',
  }).then(user => {
    userInfo.user = user;
    $.ajax({
      type: 'GET',
      url: `/api/city/${userInfo.user.cityChoice}`,
    }).then(city => {
      userInfo.city = city;
      const {
        apples,
        basicUtilitiesForApartment,
        bigBottleOfWater,
        cappuccino,
        cinemaTicket,
        domesticBeer,
        dozenEggs,
        localOneWayTicket,
        milk,
        oneBedApartmentInCityCentre,
        smallBottleOfWater,
        tenMbpsInternet,
      } = userInfo.city;

      let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [
            'Apples',
            'Utilities',
            'Big Bottle of Water',
            'Cappuccino',
            'Cinema Ticket',
            'Domestic Beer',
            'Dozen Eggs',
            'Local One Way Transit',
            'Milk',
            'One BR Apartment',
            'Small Bottle of Water',
            '10MBPS Internet',
          ],
          datasets: [
            newDataSet([
              apples,
              basicUtilitiesForApartment,
              bigBottleOfWater,
              cappuccino,
              cinemaTicket,
              domesticBeer,
              dozenEggs,
              localOneWayTicket,
              milk,
              oneBedApartmentInCityCentre,
              smallBottleOfWater,
              tenMbpsInternet,
            ]),
          ],
        },
      });
      $('#addCity').on('click', e => {
        e.preventDefault();
        $.ajax({
          type: 'GET',
          url: `/api/city/${
            $('#cityName option:selected')
              .text()
              .split(',')[0]
          }`,
        }).then(city => {
          console.dir(city);
          const {
            apples,
            basicUtilitiesForApartment,
            bigBottleOfWater,
            cappuccino,
            cinemaTicket,
            domesticBeer,
            dozenEggs,
            localOneWayTicket,
            milk,
            oneBedApartmentInCityCentre,
            smallBottleOfWater,
            tenMbpsInternet,
          } = city;

          myChart.data.datasets.push(
            newDataSet([
              apples,
              basicUtilitiesForApartment,
              bigBottleOfWater,
              cappuccino,
              cinemaTicket,
              domesticBeer,
              dozenEggs,
              localOneWayTicket,
              milk,
              oneBedApartmentInCityCentre,
              smallBottleOfWater,
              tenMbpsInternet,
            ])
          );
          myChart.update();
        });
      });
    });
  });
});
