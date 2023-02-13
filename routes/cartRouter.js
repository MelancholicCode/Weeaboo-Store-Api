const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, cartController.create);
router.patch('/:id', authMiddleware, cartController.change);
router.get('/', authMiddleware, cartController.getAll);
router.delete('/:id', authMiddleware, cartController.delete);

module.exports = router;