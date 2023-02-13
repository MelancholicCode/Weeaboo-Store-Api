const ApiError = require('../error/ApiError');
const {Cart, CartProduct} = require('../models/models');

class CartController {
  async create(req, res, next) {
    try {
      const userId = req.user.id;
      const {productId} = req.body;
  
      const {id} = await Cart.findOne({where: {userId}});
      const cartProduct = await CartProduct.create({productId, cartId: id});
  
      return res.json(cartProduct);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async change(req, res, next) {
    try {
      const {id} = req.params;
      const {count} = req.body;

      await CartProduct.update({count}, {where: {id}});
      const cartProduct = await CartProduct.findOne({where: {id}});

      res.json(cartProduct);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getAll(req, res) {
    const userId = req.user.id;

    const {id} = await Cart.findOne({where: {userId}});
    const cartProducts = await CartProduct.findAll({where: {cartId: id}});

    return res.json(cartProducts);
  }
  async delete(req, res) {
    const {id} = req.params;
    const cartProduct = await CartProduct.destroy({where: {id}});

    return res.json(cartProduct);
  }
}

module.exports = new CartController();