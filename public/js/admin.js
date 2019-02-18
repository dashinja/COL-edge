$(function() {
  const socket = io();

  $('#chooseTestimony').on('click', e => {
    e.preventDefault();
    const testimony = {
      username: $(e.target).attr('data-username'),
      image: $(e.target).attr('data-image'),
      testimonial: $(e.target).attr('data-testimonial')
    };
    $.ajax({
      type: 'POST',
      url: '/api/testimony/index',
      data: testimony
    });
  });
});
