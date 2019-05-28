var express = require('express');
var router = express.Router();
const util = require('util')

const missions = require('../models/missions')

/* GET users listing. */
router.get('/countries-by-isolation', function(req, res, next) {
  missions.getMostIsolatedCountry(req.db)
  .then((data) => {
    console.log(util.inspect(data))
    res.json({
      country: data[0]._id,
      isolation_level: data[0].count
    })
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
