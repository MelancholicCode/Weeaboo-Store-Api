const {Favorite, Product} = require('../models/models');

class FavoriteController {
  async create(req, res) {
    const userId = req.user.id;
    const {productId} = req.body;

    const favorite = await Favorite.create({userId, productId});
    const product = await Product.findOne({where: {id: favorite.productId}});

    return res.json({
      ...product.toJSON(),
      ...favorite.toJSON()
    });
  }
  async getAll(req, res) {
    const userId = req.user.id;

    const favoritesData = await Favorite.findAll({where: {userId}});

    let favorites = [];
    if (favoritesData) {
      await Promise.all(favoritesData.map(async item => {
        const favorite = await Product.findOne({where: {id: item.productId}});
        return {
          ...favorite.toJSON(),
          ...item.toJSON()
        }
      })).then(data => favorites = data);
    }

    return res.json(favorites);
  }
  async delete(req, res) {
    const {id} = req.params;
    const favorite = await Favorite.destroy({where: {productId: id}});

    return res.json(favorite);
  }
}

module.exports = new FavoriteController();