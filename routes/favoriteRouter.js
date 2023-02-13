const Router = require('express');
const router = new Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, favoriteController.create);
router.get('/', authMiddleware, favoriteController.getAll);
router.delete('/:id', authMiddleware, favoriteController.delete);

module.exports = router;