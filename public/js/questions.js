$(function() {
  $('#submitBTN').on('click', function(event) {
    event.preventDefault();

    let majorChoice = $('#a2 option:selected').text();
    let cityChoice = $('#a3 option:selected').text();

    let answers = {
      major: majorChoice,
      cost: cityChoice.split(',')[0],
    };

    $.ajax({
      type: 'POST',
      url: '/api/user/answers',
      data: answers,
      success: response => {
        return window.location.replace(response);
      },
    });
  });
});
