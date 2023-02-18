const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Cart} = require('../models/models');

const generateJwt = (id, name, email, role) => {
  return jwt.sign(
    {id, name, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  );
}

class UserController {
  async registration(req, res, next) {
    const {name, email, password, role} = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или пароль'));
    }
    const candidate = await User.findOne({where: {email}});
    if (candidate) {
      return next(ApiError.badRequest('Пользователь уже существует'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({name, email, role, password: hashPassword});
    Cart.create({userId: user.id});
    const token = generateJwt(user.id, user.name, user.email, user.role);
    return res.json({token});
  }
  async login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) {
      return next(ApiError.internal('Пользователь не существует'));
    }
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'));
    }
    const token = generateJwt(user.id, user.name, user.email, user.role);
    return res.json({token});
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role);
    return res.json({token});
  }
  async changePassword(req, res, next) {
    try {
      const password = req.body.password;
      const user = await User.findOne({where: {email: req.user.email}});
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (comparePassword) {
        return next(ApiError.internal('Пароль уже используется'));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const newUser = await User.update({password: hashPassword}, {where: {id: req.user.id}});
      const token = generateJwt(newUser.id, newUser.name, newUser.email, newUser.role);
      return res.json({token});
    } catch(err) {
      next(ApiError.internal(err.message));
    }
  }
}

module.exports = new UserController();