const {Order, OrderItem, Product, CartProduct, Cart} = require('../models/models');
const ApiError = require('../error/ApiError');

class OrderController {
  async create(req, res, next) {
    try {
      const userId = req.user.id;
      let {address} = req.body;
      if (!address) {
        next(ApiError.badRequest('Адрес не указан'));
      }
      const {id: cartId} = await Cart.findOne({where: {userId}});
      const cartItems = await CartProduct.findAll({where: {cartId}});
      const parsedCartItems = cartItems.map(item => item.toJSON());

      let generalPrice = 0;

      for (let item of parsedCartItems) {
        let {price} = await Product.findOne({where: {id: item.productId}});
        item.price = price;
        price *= item.count;
        generalPrice += price;
      }
  
      const order = await Order.create({userId, address, generalPrice});

      let orderItems = [];

      for (let item of parsedCartItems) {
        const {count, price, productId} = item;
        const orderItem = await OrderItem.create({count, price, productId, orderId: order.id});
        orderItems.push(orderItem);
        CartProduct.destroy({where: {id: item.id}});
      }
  
      return res.json({order, orderItems});
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getAll(req, res) {
    try {
      const userId = req.user.id;
      const orders = await Order.findAll({where: {userId}});
      const ordersData = await Promise.all(orders.map(async order => {
        const orderItems = await OrderItem.findAll({where: {orderId: order.id}});
        return {
          order,
          orderItems
        };
      }));
      return res.json(ordersData);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new OrderController();