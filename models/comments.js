/*const db = require('../db/index.js');
const axios = require('axios');
const ajax = require('ajax');
const commentsModel = {};


commentsModel.create = (req, res, next) => {
  db
    .one(
      'INSERT INTO comments (album_id, comment) VALUES ($1, $2) RETURNING id;',
      [
        req.body.name,
        req.body.category,
        req.body.country,
        req.body.alcohol,
        req.body.price,
      ]
    )
    .then(data => {
      res.locals.newBeerId = data.id;
      next();
    })
    .catch(error => {
      console.log('error encountered in beers.create. Error:', error);
      next(error);
    });





module.exports = albumModel;
