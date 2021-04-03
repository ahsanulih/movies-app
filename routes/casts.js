const router = require('express').Router();
const CastsControllers = require('../controllers/CastsController');

router.get('/', CastsControllers.list);
router.get('/add', CastsControllers.showAddForm);
router.post('/add', CastsControllers.add);
router.get('/:id/edit', CastsControllers.showEditForm);
router.post('/:id/edit', CastsControllers.edit);
router.get('/:id/delete', CastsControllers.delete);
router.get('/:id/get', CastsControllers.showDetail);

module.exports = router;
