const config = require('config')
const _ = require('lodash')
const url = require('url')
const util = require('util')
const fetch = require('node-fetch')

module.exports = {
  getClosetAndFurthest: async function(target,missions){

    let uri = url.format({
      protocol: 'https',
      hostname: 'maps.googleapis.com',
      pathname: '/maps/api/distancematrix/json',
      query: {
        key: config.get('google.key'),
        origins: _.map(missions,'address').join('|'),
        destinations: target
      }
    })

    let response = await fetch(uri)
    let json = await response.json()

    let zipped = _.zipWith(missions,json.rows,function(mission,jsonRow){
      mission.distance = jsonRow.elements[0].status == 'OK' ? jsonRow.elements[0].distance.value : null
      return mission
    })

    let closest = _.minBy(zipped,function(item){
      return item.distance
    })

    let furthest = _.maxBy(zipped,function(item){
      return item.distance
    })

    let result = {
      closest: closest,
      furthest: furthest
    }

    return result

  }
}
