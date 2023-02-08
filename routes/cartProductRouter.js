const Router = require('express');
const router = new Router();
const cartProductController = require('../controllers/cartProductController');

router.post('/', cartProductController.create);
router.get('/', cartProductController.getAll);
router.delete('/:id', cartProductController.delete);

module.exports = router;