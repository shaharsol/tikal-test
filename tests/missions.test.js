const missions = require('../models/missions')
const config = require('config')
const monk = require('monk');
const db = monk(config.get('mongo.uri'));

test('get most isolated country',() => {
  missions.getCountriesByIsolation(db)
  .then((data) => {
    expect(data[0].country).toEqual('Morocco')
  })
  .catch((err) => {
    console.log(err)
  })
})
