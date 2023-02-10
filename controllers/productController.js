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

      JSON.parse(genreIds).forEach(id => {
        ProductGenre.create({genreId: id, productId: product.id});
      });
    
      return res.json(product);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getAll(req, res) {
    const {genreId, authorId} = req.query;
    let products;
    if (!genreId && !authorId) {
      products = await Product.findAll();
    }
    if (genreId && !authorId) {
      const productIds = await ProductGenre.findAll({where: {genreId}});
      console.log(productIds);
    }
    if (!genreId && authorId) {
      products = await Product.findAll({where: {authorId}});
    }
    if (genreId && authorId) {
      products = await Product.findAll({where: {genreId, authorId}});
    }
    return res.json(products);
  }
  async getOne(req, res) {

  }
  async delete(req, res) {

  }
}

module.exports = new ProductController();