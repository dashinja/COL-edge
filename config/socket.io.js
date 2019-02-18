module.exports = server => {
  const io = require('socket.io')(server);
  io.on('connection', socket => {
    console.log('user connected');
    socket.on('disconnect', () => console.log('user disconnected'));
    socket.on('newMessage', data => {
      io.emit('newMessage', data);
    });
    socket.on('newNote', data => {
      io.emit('newNote', data);
    });
    socket.on('newTestimony', data => {
      io.emit('newTestimony', data);
    });
  });
};
