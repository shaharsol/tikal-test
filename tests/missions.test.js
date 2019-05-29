const config = require('config')
const monk = require('monk');
const db = monk(config.get('mongo.uri'));
const util = require('util')

const missions = require('../models/missions')
const distance = require('../lib/distance')

test('empty db should work', async () => {
  let result = await missions.empty(db)
  return expect(result).toBeTruthy()
})

test('get most isolated country with empty db should return error',() => {
  return missions.getMostIsolatedCountry(db)
  .then((data) => {
  })
  .catch((err) => {
    expect(err).toBeTruthy()
  })
})

test('populate db should insert 10 rows', async () => {
  let result = await missions.load(db,[
     {
        agent: '007',
        country: 'Brazil',
        address: 'Avenida Vieira Souto 168 Ipanema, Rio de Janeiro',
        date: 'Dec 17, 1995, 9:45:17 PM'
     },
     {
        agent: '005',
        country: 'Poland',
        address: 'Rynek Glowny 12, Krakow',
        date: 'Apr 5, 2011, 5:05:12 PM'
     },
     {
        agent: '007',
        country: 'Morocco',
        address: '27 Derb Lferrane, Marrakech',
        date: 'Jan 1, 2001, 12:00:00 AM'
     },
     {
        agent: '005',
        country: 'Brazil',
        address: 'Rua Roberto Simonsen 122, Sao Paulo',
        date: 'May 5, 1986, 8:40:23 AM'
     },
     {
        agent: '011',
        country: 'Poland',
        address: 'swietego Tomasza 35, Krakow',
        date: 'Sep 7, 1997, 7:12:53 PM'
     },
     {
        agent: '003',
        country: 'Morocco',
        address: 'Rue Al-Aidi Ali Al-Maaroufi, Casablanca',
        date: 'Aug 29, 2012, 10:17:05 AM'
     },
     {
        agent: '008',
        country: 'Brazil',
        address: 'Rua tamoana 418, tefe',
        date: 'Nov 10, 2005, 1:25:13 PM'
     },
     {
        agent: '013',
        country: 'Poland',
        address: 'Zlota 9, Lublin',
        date: 'Oct 17, 2002, 10:52:19 AM'
     },
     {
        agent: '002',
        country: 'Morocco',
        address: 'Riad Sultan 19, Tangier',
        date: 'Jan 1, 2017, 5:00:00 PM'
     },
     {
        agent: '009',
        country: 'Morocco',
        address: 'atlas marina beach, agadir',
        date: 'Dec 1, 2016, 9:21:21 PM'
     }
  ])
  return expect(result.length).toEqual(10)
})

test('get most isolated country should be Morocco',async () => {
  let result = await missions.getMostIsolatedCountry(db)
  return expect(result[0]._id).toEqual('Morocco')
})

test('get all isolated countries 2nd should be Poland',async () => {
  let result = await missions.getIsolatedCountries(db)
  return expect(result[1]._id).toEqual('Poland')
})

test('get closet and furthest to israel should return Poland as closest and Morroco (why not brasil?)',async () => {
  let data = await missions.getAll(db)
  let distances = await distance.getClosetAndFurthest('Israel',data)
  return expect(distances.closest.address).toEqual('Rynek Glowny 12, Krakow')
})

test('get closet and furthest to israel should return Morroco as furthest (why not brasil?)',async () => {
  let data = await missions.getAll(db)
  let distances = await distance.getClosetAndFurthest('Israel',data)
  return expect(distances.furthest.address).toEqual('atlas marina beach, agadir')
})
