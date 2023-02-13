const {Genre} = require('../models/models');
const ApiError = require('../error/ApiError');

class GenreController {
  async create(req, res, next) {
    const {name} = req.body;
    if (!name) {
      next(ApiError.badRequest('Нет имени жанра'));
    }
    const genre = await Genre.create({name});
    return res.json(genre);
  }
  async getAll(req, res) {
    const genres = await Genre.findAll();
    return res.json(genres);
  }
  async delete(req, res) {
    const {id} = req.params;
    const genre = await Genre.destroy({where: {id}});
    return res.json(genre);
  }
}

module.exports = new GenreController();