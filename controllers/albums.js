const albumRouter = require('express').Router();
const albumModel = require('../models/albums');

albumRouter.get('/home', albumModel.allAlbums, (req, res, next) => {
  console.log('In your allAlbums function', res.locals.allAlbumsData);
  res.render('index', {
    allAlbumsInfo: res.locals.allAlbumsData,
    artName: res.locals.allAlbumsData[0].artistName,
  });
});

module.exports = albumRouter;
