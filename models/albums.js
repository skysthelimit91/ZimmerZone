const db = require('../db/index.js');
const axios = require('axios');

const albumModel = {};

function albumNameSeedStep(albumData) {
  // Deal with the array of pokemon information in pokemonData.
  // Strictly speaking we should use map rather than forEach
  // and the Promise.all method to move on to the next step,
  // but since we don't care about getting data back from the DB
  // after each query we can get away with .forEach for now.

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
  // If there's a link to more pokemon information, recursively follow it
  if (albumData.next) {
    axios({
      method: 'get',
      url: albumData.next,
    })
      .then(response => {
        // recursively call pokemonNameSeedStep
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
  // see https://github.com/axios/axios#user-content-axios-api for axios docs
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

module.exports = albumModel;
