var express = require('express');
var router = express.Router();
const util = require('util')
const _ = require('underscore')

const missions = require('../models/missions')
const distance = require('../lib/distance')

/* GET users listing. */
router.get('/countries-by-isolation', function(req, res, next) {
  missions.getIsolatedCountries(req.db)
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
  missions.getMostIsolatedCountry(req.db)
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
  missions.getAll(req.db)
  .then((data) => {
    return distance.getClosetAndFurthest(req.body.target,data)
  })
  .then((distances) => {
    res.json(distances)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
});

module.exports = router;
