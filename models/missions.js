module.exports = {
  getAll: async function(db){
    let missions = db.get('missions');
    let all = await missions.find({});
    return all;
  },
  getIsolatedCountries: async function(db){
    let missions = db.get('missions');
    let result = await missions.aggregate([
      {
        $group: {
          _id: "$agent",
          count: {$sum: 1},
          country: {$first: "$country"}
        }
      },
      {
        $match: {
          count: {$eq: 1}
        }
      },
      {
        $group: {
          _id: "$country",
          count: {$sum: 1}
        }
      },
      {
        $sort: {
          count: -1
        }
      }
    ])

    return result;
  },
  getMostIsolatedCountry: async function(db){
    let missions = db.get('missions');
    let result = await missions.aggregate([
      {
        $group: {
          _id: "$agent",
          count: {$sum: 1},
          country: {$first: "$country"}
        }
      },
      {
        $match: {
          count: {$eq: 1}
        }
      },
      {
        $group: {
          _id: "$country",
          count: {$sum: 1}
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $limit: 1
      }
    ])

    return result;

  },
  getClosest: function (db,target){

  },
  empty: async function(db){
    let missions = db.get('missions');
    let result = await missions.remove({})
    return result;
  },
  load: async function(db,data){
    let missions = db.get('missions');
    let result = await missions.insert(data)
    return result;
  }
}
