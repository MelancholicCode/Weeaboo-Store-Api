const Router = require('express');
const router = new Router();
const favoriteController = require('../controllers/favoriteController');

router.post('/', favoriteController.create);
router.get('/', favoriteController.getAll);
router.delete('/:id', favoriteController.delete);

module.exports = router;