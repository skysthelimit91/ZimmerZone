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
  // If there's a link to more album information, recursively follow it
  if (albumData.next) {
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

module.exports = albumModel;
