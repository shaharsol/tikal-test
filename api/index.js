const { Router } = require('express');
const missions = require('./missions');
const router = new Router();

router.use('/', missions);

module.exports = router;
