const uuid = require('uuid');
const path = require('path');
const {Product} = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
  async create(req, res, next) {
    try {
      const {name, description, price, slug, authorId, genreId} = req.body;
      const {img} = req.files;
      let filename = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', filename));
  
      const product = await Product.create({name, description, img: filename, price, slug, authorId, genreId});
    
      return res.json(product);
    } catch(err) {
      next(ApiError.badRequest(err.message));
    }
  }
  async getAll(req, res) {

  }
  async getOne(req, res) {

  }
  async delete(req, res) {

  }
}

module.exports = new ProductController();