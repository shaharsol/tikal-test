var express = require('express');
var router = express.Router();
const util = require('util')
const _ = require('underscore')

const { getIsolatedCountries,getMostIsolatedCountry,getAll } = require('../models/missions')
const { getClosetAndFurthest } = require('../lib/distance')

/* GET users listing. */
router.get('/countries-by-isolation', function(req, res, next) {
  getIsolatedCountries(req.db)
  .then((data) => {
    if(data.length == 0){
      throw('no data')
    }else{
      res.json(_.map(data,function(country){
        return {
          country: country._id,
          isolation_level: country.count
        }
      }))
    }
  })
  .catch((err) => {
    res.status(500).send(err)
  })
});

router.get('/most-isolated-country', function(req, res, next) {
  getMostIsolatedCountry(req.db)
  .then((data) => {
    if(data.length == 0){
      throw('no data')
    }else{
      res.json({
        country: data[0]._id,
        isolation_level: data[0].count
      })
    }
  })
  .catch((err) => {
    res.status(500).send(err)
  })
});

router.post('/find-closest', function(req, res, next) {
  getAll(req.db)
  .then((data) => {
    return getClosetAndFurthest(req.body.target,data)
  })
  .then((distances) => {
    res.json(distances)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
});

module.exports = router;
