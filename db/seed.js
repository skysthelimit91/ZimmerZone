// We don't have to write seed files in sql! We can also
// use JavaScript... and that JavaScript can use our model.

// We'll use the albumModel.

const albumModel = require('../models/albums');

albumModel.seedAllAlbumNames();



