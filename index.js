const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mustacheExpress = require('mustache-express');
const ajax = require('ajax');
const app = express();

const PORT = process.env.PORT || 3000;

// registers the template engine for use in res.render
app.engine('html', mustacheExpress());
// sets the file extension to use for views when the file extension is omitted
app.set('view engine', 'html');
// sets the the directory that will contain our mustache template files, or "views"
app.set('views', __dirname + '/views');
// sets the directory that will contain our static (not generated on the fly) resources, such as css, client-side Javascript files, and images
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.listen(PORT, () => {
  console.log('Server started on ' + port);
});

app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

const userRouter = require('./controllers/users.js');
app.use('/users', userRouter);

const albumRouter = require('./controllers/albums.js');
app.use('/albums', albumRouter);
app.use('/users/profile', albumRouter);

app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});
