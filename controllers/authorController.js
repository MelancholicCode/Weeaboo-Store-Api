const {Author} = require('../models/models');
const ApiError = require('../error/ApiError');

class AuthorController {
  async create(req, res) {
    const {name} = req.body;
    if (!name) {
      next(ApiError.badRequest('Нет имени автора'));
    }
    const author = await Author.create({name});
    return res.json(author);
  }
  async getAll(req, res) {
    const authors = await Author.findAll();
    return res.json(authors);
  }
  async delete(req, res) {
    const {id} = req.params;
    const author = await Author.destroy({where: {id}});
    return res.json(author);
  }
}

module.exports = new AuthorController();