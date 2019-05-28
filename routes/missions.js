var express = require('express');
var router = express.Router();

const missions = require('../models/missions')

/* GET users listing. */
router.get('/countries-by-isolation', function(req, res, next) {
  missions.getCountriesByIsolation(req.db)
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
});

router.post('/find-closest', function(req, res, next) {
  missions.getClosest(req.db,req.body.target)
  .then((data) => {
    res.json(data)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
});

module.exports = router;
