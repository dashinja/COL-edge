$(function() {
  const socket = io();
  const chatDiv = document.getElementById('fullChat');
  chatDiv.scrollTop = chatDiv.scrollHeight;

  $('#chatBox').keyup(e => {
    e.preventDefault();
    const keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode === 13) {
      const message = {
        text: $('#chatBox')
          .val()
          .trim()
      };
      $.ajax({
        type: 'POST',
        url: '/api/chat',
        data: message
      });
      socket.emit('newMessage', message);
      $('#chatBox').val('');
    }
  });

  socket.on('newMessage', message => {
    const newMessage = $(`<h5>${message.text}</h5>`);
    $('#fullChat').append(newMessage);
    chatDiv.scrollTop = chatDiv.scrollHeight;
  });
});
