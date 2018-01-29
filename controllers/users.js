const User = require('../models/user');
const userRouter = require('express').Router();
const passport = require('passport');

const auth = require('../services/auth');

userRouter.get('/', (req, res, next) => {
  res.redirect('/users/profile');
});

userRouter.post(
  '/',
  // we want the behavior of the site to vary depending on whether or
  // not the user is already logged in. If they are logged in, we want
  // to send them to /users/profile. If they are not, we want to send
  // them to users/new.
  passport.authenticate(
    // The following string indicates the particular strategy instance
    // we'll want to use to handle signup. We defined behavior for
    // 'local-signup' back in index.js.
    'local-signup',
    {
      failureRedirect: '/users/new',
      successRedirect: '/users/profile',
    }
  )
);

// ----------------------------------------
// register new user

userRouter.get('/new', (req, res) => {
  res.render('users/new');
});

// ----------------------------------------
// user logout

userRouter.get('/logout', (req, res) => {
  // passport put this method on req for us
  req.logout();
  // redirect back to index page
  res.redirect('/users/login');
});

// ----------------------------------------
// user login

userRouter.get('/login', (req, res) => {
  res.render('users/login');
});

// passport.authenticate will _build_ middleware for us
// based on the 'local-login' strategy we registered with
// passport in auth.js
userRouter.post(
  '/login',
  passport.authenticate('local-login', {
    failureRedirect: '/users/login',
    successRedirect: '/users/profile',
  })
);

// ----------------------------------------
// user profile

userRouter.get(
  '/profile',
  // Middleware (that we wrote) ensuring that if the user is not
  // authenticated, he or she will be redirected to the login screen.
  auth.restrict,
  User.findByEmailMiddleware,
  (req, res) => {
    console.log('in handler for users/profile');
    console.log('req.user:');
    console.log(req.user);
    res.render('users/profile', {
      user: res.locals.userData,
    });
  }
);

module.exports = userRouter;
