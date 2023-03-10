const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const favoriteRouter = require('./favoriteRouter');
const orderRouter = require('./orderRouter');
const genreRouter = require('./genreRouter');
const authorRouter = require('./authorRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/favorite', favoriteRouter);
router.use('/order', orderRouter);
router.use('/genre', genreRouter);
router.use('/author', authorRouter);

module.exports = router;