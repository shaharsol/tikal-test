const config = require('config');
const monk = require('monk');
const db = monk(config.get('mongo.uri'));

const dbMW = (req, res, next) => {
  req.db = db;
  next();
}

module.exports = {
  dbMW
}
