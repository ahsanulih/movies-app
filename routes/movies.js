const router = require('express').Router();
const MoviesControllers = require('../controllers/MoviesController');

router.get('/', MoviesControllers.list);
router.get('/add', MoviesControllers.showAddForm);
router.post('/add', MoviesControllers.add);
router.get('/:id/edit', MoviesControllers.showEditForm);
router.post('/:id/edit', MoviesControllers.edit);
router.get('/:id/delete', MoviesControllers.delete);
router.get('/:id/add-cast', MoviesControllers.showDetail);
router.post('/:id/add-cast', MoviesControllers.addCast);

module.exports = router;
