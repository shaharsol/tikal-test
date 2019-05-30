const config = require('config')
const _ = require('lodash')
const url = require('url')
const util = require('util')
const fetch = require('node-fetch')

const getClosetAndFurthest = async (target,missions) => {

  const uri = url.format({
    protocol: 'https',
    hostname: 'maps.googleapis.com',
    pathname: '/maps/api/distancematrix/json',
    query: {
      key: config.get('google.key.part1') + config.get('google.key.part2'), //  can't keep whole key in config, it's a secret!
      origins: _.map(missions,'address').join('|'),
      destinations: target
    }
  })

  const response = await fetch(uri)
  const json = await response.json()

  const zipped = _.zipWith(missions,json.rows,(mission,jsonRow) => {
    mission.distance = jsonRow.elements[0].status == 'OK' ? jsonRow.elements[0].distance.value : null
    return mission
  })

  const closest = _.minBy(zipped,(item) => {
    return item.distance
  })

  const furthest = _.maxBy(zipped,(item) => {
    return item.distance
  })

  const result = {
    closest: closest,
    furthest: furthest
  }

  return result

};

module.exports = {
  getClosetAndFurthest
}
