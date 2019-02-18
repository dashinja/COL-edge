require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
// controllers
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');
const userRouter = require('./routes/userRoutes');
const apiRouter = require('./routes/apiRoutes');
const htmlRouter = require('./routes/htmlRoutes');

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'Bootcamp-fa-life', resave: true, saveUninitialized: true })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

require('./config/passport')(app);

// working on sockets
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', () => console.log('user disconnected'));
  socket.on('newMessage', data => {
    console.log('got a new message');
    console.dir(data);
    io.emit('newMessage', data);
  });
});

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/api', apiRouter);
app.use('/', htmlRouter);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  server.listen(PORT, () => {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;
