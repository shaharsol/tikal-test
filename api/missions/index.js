const { Router } = require('express');
const { countriesByIsolation, mostIsolatedCountry, findClosest } = require('./missions.controller');
const router = new Router();

router
  .route('/countries-by-isolation')
  .get(countriesByIsolation);

router
  .route('/most-isolated-country')
  .get(mostIsolatedCountry);

router
  .route('/find-closest')
  .post(findClosest);

module.exports = router;
