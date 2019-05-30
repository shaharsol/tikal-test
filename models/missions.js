const getAll = async (db) => {
  let missions = db.get('missions');
  let all = await missions.find({});
  return all;
};

const getIsolatedCountries = async (db) => {
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
};

const getMostIsolatedCountry = async (db) => {
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

};

const empty = async (db) => {
  let missions = db.get('missions');
  let result = await missions.remove({})
  return result;
};

const load = async (db,data) => {
  let missions = db.get('missions');
  let result = await missions.insert(data)
  return result;
};

module.exports = {
  getAll,
  getIsolatedCountries,
  getMostIsolatedCountry,
  empty,
  load
}
