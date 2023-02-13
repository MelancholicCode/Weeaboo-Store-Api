const {Favorite} = require('../models/models');

class FavoriteController {
  async create(req, res) {
    const {userId} = req.user;
    const {productId} = req.body;

    const favorite = await Favorite.create({userId, productId});

    return res.json(favorite);
  }
  async getAll(req, res) {
    const {userId} = req.user;

    const favorites = await Favorite.findAll({where: {userId}});

    return res.json(favorites);
  }
  async delete(req, res) {
    const {id} = req.params;
    const favorite = await Favorite.destroy({where: {id}});

    return res.json(favorite);
  }
}

module.exports = new FavoriteController();