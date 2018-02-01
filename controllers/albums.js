const albumRouter = require('express').Router();
const albumModel = require('../models/albums');
const auth = require('../services/auth');

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

albumRouter.post(
  '/:albumsId',
  albumModel.create,
  auth.restrict,

  (req, res, next) => {
    console.log('in creat function');
    res.json(res.locals.findByIdData);
  }
);

albumRouter.delete('/:commentsId', albumModel.destroy, (req, res, next) => {
  res.json({ id: req.params.commentsId });
});

albumRouter.put(
  '/:commentsId',
  albumModel.update,
  albumModel.postComments,
  (req, res, next) => {
    res.json(res.locals.updatedComment);
  }
);

// albumRouter.get(
//   '/:albumsId/comment-edit',
//   albumModel.update,
//   (req, res, next) => {
//     res.json(res.locals.updatedComment);
//   }
// );

// albumRouter.get(
//   '/:albumsId/:commentsId',
//   albumModel.findById,
//   albumModel.postComments,
//   (req, res, next) => {
//     console.log('in findById function');
//     res.render('comment', {
//       albuminfo: res.locals.findByIdData,
//       commentinfo: res.locals.allComments,
//     });
//   }
// );

// albumRouter.get(
//   '/:albumsId/:commentsId',
//   albumModel.findComments,
//   (req, res, next) => {
//     res.render('comment', {
//       J: res.locals.SpecificComments,
//     });
//   }
// );

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
