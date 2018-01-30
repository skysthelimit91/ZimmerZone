const albumRouter = require('express').Router();
const albumModel = require('../models/albums');

albumRouter.get('/home', albumModel.allAlbums, (req, res, next) => {
  console.log('In your allAlbums function');
  res.render('index', {
    allAlbumsInfo: res.locals.allAlbumsData,
    //artName: res.locals.allAlbumsData[0].artistName,
  });
});

albumRouter.get('/:albumsId', albumModel.findById, (req, res, next) => {
  res.render('show', res.locals.findByIdData);
});

albumRouter.post('/:albumsId', albumModel.create, (req, res, next) => {
  res.json(res.locals.findByIdData);
});

module.exports = albumRouter;     
