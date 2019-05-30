var express = require('express');
var router = express.Router();
const util = require('util')
const _ = require('underscore')

const { getIsolatedCountries,getMostIsolatedCountry,getAll } = require('../../models/missions')
const { getClosetAndFurthest } = require('../../lib/distance')

const countriesByIsolation = async (req,res) => {
  try{
    const isolatedCountries = await getIsolatedCountries(req.db)
    if(isolatedCountries.length == 0){
      throw('no data')
    }else{
      res.json(_.map(isolatedCountries,(country) => {
        return {
          country: country._id,
          isolation_level: country.count
        }
      }))
    }
  } catch(err) {
    res.status(500).send(err)
  }
}

const mostIsolatedCountry = async (req,res) => {
  try{
    const mostIsolatedCountry = await getMostIsolatedCountry(req.db)
    if(mostIsolatedCountry.length == 0){
      throw('no data')
    }else{
      res.json({
        country: mostIsolatedCountry[0]._id,
        isolation_level: mostIsolatedCountry[0].count
      })
    }
  } catch(err){
    res.status(500).send(err)
  }
}

const findClosest = async (req, res) => {
  try{
    const allMissions = await getAll(req.db)
    const distances = await getClosetAndFurthest(req.body.target,allMissions)
    res.json(distances)
  } catch(err){
    res.status(500).send(err)
  }
}

module.exports = {
  countriesByIsolation,
  mostIsolatedCountry,
  findClosest
};
