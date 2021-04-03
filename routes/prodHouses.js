const router = require('express').Router();
const ProdHousesControllers = require('../controllers/ProdHousesController');

router.get('/', ProdHousesControllers.list);

module.exports = router;
