const router = require('express').Router();
const prodHousesRoutes = require('./prodHouses');
const moviesRoutes = require('./movies');
const castsRoutes = require('./casts');

router.get('/', (req, res) => {
    res.render('home');
});

router.use('/movies', moviesRoutes);
router.use('/production-houses', prodHousesRoutes);
router.use('/casts', castsRoutes);

module.exports = router;
