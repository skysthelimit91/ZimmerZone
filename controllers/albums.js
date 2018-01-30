const albumRouter = require('express').Router();
const albumModel = require('../models/albums');

albumRouter.get('/home', albumModel.allAlbums, (req, res, next) => {
  console.log('In your allAlbums function');
  res.render('index', {
    allAlbumsInfo: res.locals.allAlbumsData,
    //artName: res.locals.allAlbumsData[0].artistName,
  });
});

albumRouter.get(
  '/:albumsId',
  albumModel.findById,
  albumModel.postComments,
  (req, res, next) => {
    console.log('in findById function');
    res.render('show', {
      albuminfo: res.locals.findByIdData,
      commentinfo: res.locals.allComments,
    });
  }
);

albumRouter.post('/:albumsId', albumModel.create, (req, res, next) => {
  res.json(res.locals.findByIdData);
});

/*albumRouter.get('/:albumsId', albumModel.postComments, (req, res, next) => {
  console.log('make comments appear');
  res.render('show', {
    commentinfo: res.locals.allComments,
  });
});/*

/*albumRouter.get('/:albumsId', albumModel.postComments, (req, res, next) => {
  console.log('in post comments function');
  res.render('show', {
    AllCommentsinfo: res.locals.allComments,
  });
});
*/
module.exports = albumRouter;
