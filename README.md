# tikal-test

### installation

Clone the repo and then `npm install`.

You'll also need a local mongo running on the default port.

### run the tests

```
npm test
```

### run the server

Start by populating the database `node populate-db.js`. Then `npm start`.
Then you can use curl e.g. `curl -X POST -d "target=israel" http://localhost:3000/find-closest`

### notes

* Please ignore the deprecation warning issued by `monk`, the module I use as a mongo wrapper
* The name chosen to the endpoint `/countries-by-isolation` is not aligned with the objectives defined as _Implement an algorithm that finds the most isolated country_, so I implemented both, i.e. added an endpoint `/most-isolated-country`
* Excused myself from the bonus part ;-)
* Please ignore express generator left overs e.g. unused `views` directory
* Also excused myself from dealing with `Jest did not exit one second after the test run has completed.`
