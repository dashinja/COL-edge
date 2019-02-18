$(function() {
  const socket = io();

  $(document).on('click', '#chooseTestimony', e => {
    e.preventDefault();
    const testimony = {
      username: $(e.target).attr('data-username'),
      image: $(e.target).attr('data-image'),
      testimonial: $(e.target).attr('data-testimonial'),
    };
    $.ajax({
      type: 'POST',
      url: '/api/testimony/index',
      data: testimony,
    });
    socket.emit('testimonyToIndex', testimony);
  });

  socket.on('testimonyToIndex', testimony => {
    const newTestimony = $(`<tr id=${testimony.username}>
    <td>
        <img src="${testimony.image}" style="max-height: 80px;" />
    </td>
    <td>
        ${testimony.username}
    </td>
    <td>
        "${testimony.testimonial}"
    </td>
    <td>
        <a href="#" id="removeTestimony" data-username="${testimony.username}"
            data-testimonial="${testimony.testimonial}" data-image="${testimony.image}">Remove ${
      testimony.username
    }'s
            testimonial from
            Home Page &rarr;</a>
    </td>
</tr>`);
    $(`#${testimony.username}`).remove();
    $('#indexTestimonialTable').append(newTestimony);
  });

  $(document).on('click', '#removeTestimony', e => {
    e.preventDefault();
    const testimony = {
      username: $(e.target).attr('data-username'),
      image: $(e.target).attr('data-image'),
      testimonial: $(e.target).attr('data-testimonial'),
      onIndexPage: false,
    };
    $.ajax({
      type: 'DELETE',
      url: '/api/testimony/index',
      data: testimony,
    });
    $.ajax({
      type: 'PATCH',
      url: '/api/testimony/user',
      data: testimony,
    });
    socket.emit('indexTestimonyRemove', testimony);
  });

  socket.on('indexTestimonyRemove', testimony => {
    const newTestimony = $(`<tr id=${testimony.username}>
    <td>
        <img src="${testimony.image}" style="max-height: 80px;" />
    </td>
    <td>
        ${testimony.username}
    </td>
    <td>
        "${testimony.testimonial}"
    </td>
    <td>
        <a href="#" id="chooseTestimony" data-username="${testimony.username}"
            data-testimonial="${testimony.testimonial}" data-image="${testimony.image}">Display ${
      testimony.username
    }'s
            testimonial on
            Home Page &rarr;</a>
    </td>
</tr>`);
    $(`#${testimony.username}`).remove();
    $('#testimonialTable').append(newTestimony);
  });
});
