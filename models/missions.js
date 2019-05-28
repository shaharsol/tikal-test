module.exports = {
  getAll: async function(db){
    let missions = db.get('missions');
    let all = await missions.find({});
    return all;
  },
  getIsolatedAgents: async function(db){
    let missions = db.get('missions');
    let isolatedAgents = missions.aggregate([
      {
        $group: {
          _id: "$agent",
          count: {$sum: 1}
        }
      },
      {
        $match: {
          count: {$eq: 1}
        }
      }
    ])
  },
  getMostIsolatedCountry: function(db){
    let missions = db.get('missions');
    let result = missions.aggregate([
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

  }
}
