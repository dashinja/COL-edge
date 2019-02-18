$(function() {
  const ctx = document.getElementById('myChart');
  ctx.width = 400;
  ctx.height = 400;

  const userInfo = {
    user: {},
    city: {}
  };

  $.ajax({
    type: 'GET',
    url: '/api/user'
  }).then(user => {
    userInfo.user = user;
    $.ajax({
      type: 'GET',
      url: `/api/city/${userInfo.user.cityChoice}`
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
        tenMbpsInternet
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
            '10MBPS Internet'
          ],
          datasets: [
            {
              label: '# of Votes',
              data: [
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
                tenMbpsInternet
              ],
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
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
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
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    });
  });
});
