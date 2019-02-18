$(function() {
  const socket = io();

  socket.on('testimonyToIndex', testimony => {
    const newTestimony = $(`<div class="col-md-5 testimonialText2" id="${
      testimony.username
    }">
    <img src="${testimony.image}" />
    <h5>${testimony.testimonial}</h5>
    <h6>-${testimony.username}</h6>
  </div>`);
    $('#testimonialRow').append(newTestimony);
  });

  socket.on('indexTestimonyRemove', testimony => {
    $(`#${testimony.username}`).remove();
  });
});
