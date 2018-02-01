const db = require('../db/index.js');
const axios = require('axios');

const albumModel = {};

function albumNameSeedStep(albumData) {
  albumData.forEach(albumData => {
    db
      .none(
        'INSERT INTO albums (artistName, collectionName, artworkUrl100, collectionViewUrl) VALUES ($1, $2, $3, $4);',
        [
          albumData.artistName,
          albumData.collectionName,
          albumData.artworkUrl100,
          albumData.collectionViewUrl,
        ]
      )
      .catch(err => {
        console.log(
          'Error encounted in albumNameSeedStep pgpromise call, error:',
          err
        );
      });
  });
}
// If there's a link to more album information, recursively follow it
/*if (albumData.next) {
    axios({
      method: 'get',
      url: albumData.next,
    })
      .then(response => {
        // recursively call albumNameSeedStep
        albumNameSeedStep(response.data);
      })
      .catch(err => {
        console.log(
          'Error encountered in axios call in albumNameSeedStep, error:',
          err
        );
      });
  }
}
*/
albumModel.seedAllAlbumNames = function() {
  axios({
    method: 'get',
    url: 'https://itunes.apple.com/lookup?id=111203&entity=album',
  })
    .then(response => {
      var L = response.data.results.slice(1, 51);
      albumNameSeedStep(L);
    })
    .catch(err => {
      console.log('Error encountered in albumModel.seedAllAlbumNames:', err);
    });
};

albumModel.allAlbums = (req, res, next) => {
  db
    .manyOrNone('SELECT * FROM albums ORDER BY collectionName')
    .then(albumResults => {
      res.locals.allAlbumsData = albumResults;
      next();
    })
    .catch(err => {
      console.log('error encountered in albumModel.allAlbums, error:', error);
      next(err);
    });
};

albumModel.findById = (req, res, next) => {
  const id = req.params.albumsId;
  db
    .one('SELECT * FROM albums WHERE albums.id = ${id}', { id: id })
    .then(data => {
      res.locals.findByIdData = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in albumModel.findById. Error:', error);
      next(error);
    });
};

albumModel.create = (req, res, next) => {
  db
    .one(
      'INSERT INTO comments (album_id, comment, user_id) VALUES ($1, $2, $3) RETURNING id;',
      [req.body.album_id, req.body.comments, req.user.email]
    )
    .then(data => {
      res.locals.newcommentInfo = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in albumModel.create. Error:', error);
      next(error);
    });
};

albumModel.postComments = (req, res, next) => {
  const id = req.params.albumsId;
  db
    .any(
      'SELECT comments.comment, comments.user_id, comments.id, comments.album_id FROM comments JOIN albums ON (comments.album_id = albums.id) WHERE albums.id = ${id}',
      { id: id }
    )
    .then(data => {
      res.locals.allComments = data;
      next();
    })
    .catch(error => {
      console.log(
        'error encountered in albumModel.postComments. Error:',
        error
      );
      next(error);
    });
};

albumModel.destroy = (req, res, next) => {
  db
    .none('DELETE FROM comments WHERE id = $1', [req.params.commentsId])
    .then(() => {
      next();
    })
    .catch(error => {
      console.log('error encountered in albumModel.destroy. error:', error);
      next(error);
    });
};

albumModel.update = (req, res, next) => {
  db
    .one('UPDATE comments SET comment = $1 WHERE album_id = $2 RETURNING *;', [
      req.body.comment,
      req.params.commentsId,
    ])
    .then(data => {
      res.locals.updatedComment = data;
      next();
    })
    .catch(error => {
      console.log('error encountered in albumModel.update. Error:', error);
      next(error);
    });
};

// albumModel.findComments = (req, res, next) => {
//   const id = req.params.commentsId;

//   db
//     .any('SELECT * FROM comments WHERE comments.id = ${id}', { id: id })
//     .then(data => {
//       res.locals.SpecificComments = data;
//       next();
//     })
//     .catch(error => {
//       console.log(
//         'error encountered in albumModel.findComments. error:',
//         error
//       );
//       next(error);
//     });
// };

module.exports = albumModel;
