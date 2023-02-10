const uuid = require('uuid');
const path = require('path');
const {Product} = require('../models/models');
const {ProductGenre} = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
  async create(req, res, next) {
    try {
      const {name, description, price, slug, authorId, genreIds} = req.body;
      const {img} = req.files;
      let filename = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', filename));
  
      const product = await Product.create({name, description, img: filename, price, slug, authorId});

      if (genreIds) {
        JSON.parse(genreIds).forEach(id => {
          ProductGenre.create({genreId: id, productId: product.id});
        });
      }
    
      return res.json(product);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getAll(req, res, next) {
    try {
      let {genreId, authorId, limit, page} = req.query;

      page = page || 1;
      limit = limit || 8;
      let offset = page * limit - limit;

      let products;
      if (!genreId && !authorId) {
        products = await Product.findAndCountAll({limit, offset});
      }
      if (genreId && !authorId) {
        const productGenre = await ProductGenre.findAll({where: {genreId}});
        const productIds = productGenre.map(item => item.toJSON().productId);
        products = await Product.findAndCountAll({where: {id: productIds}, limit, offset});
      }
      if (!genreId && authorId) {
        products = await Product.findAndCountAll({where: {authorId}, limit, offset});
      }
      if (genreId && authorId) {
        const productGenre = await ProductGenre.findAll({where: {genreId}});
        const productIds = productGenre.map(item => item.toJSON().productId);
        products = await Product.findAndCountAll({where: {authorId, id: productIds}, limit, offset});
      }
      return res.json(products);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getOne(req, res) {
    const {id} = req.params;
    const product = await Product.findOne({where: {id}});
    return res.json(product);
  }
  async delete(req, res) {

  }
}

module.exports = new ProductController();