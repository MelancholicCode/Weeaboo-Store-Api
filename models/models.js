const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const { Sequelize } = require('../db');

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  role: {type: DataTypes.STRING, defaultValue: 'USER'}
});

const Product = sequelize.define('product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false},
  description: {type: DataTypes.STRING(1500), allowNull: false},
  img: {type: DataTypes.STRING, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false},
  slug: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const CartProduct = sequelize.define('cart_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Favorite = sequelize.define('favorite', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Author = sequelize.define('author', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Genre = sequelize.define('genre', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, unique: true, allowNull: false}
});

const Order = sequelize.define('order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  productIds: {type: DataTypes.ARRAY(Sequelize.INTEGER)},
  price: {type: DataTypes.INTEGER, allowNull: false},
  date: {type: DataTypes.STRING, allowNull: false}
});

const AuthorGenre = sequelize.define('author_genre', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const ProductGenre = sequelize.define('product_genre', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

User.hasMany(CartProduct);
CartProduct.belongsTo(User);

User.hasMany(Favorite);
Favorite.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

CartProduct.hasOne(Product);
Product.belongsTo(CartProduct);

Favorite.hasOne(Product);
Product.belongsTo(Favorite);

Genre.belongsToMany(Product, {through: ProductGenre});
Product.belongsToMany(Genre, {through: ProductGenre});

Author.hasMany(Product);
Product.belongsTo(Author);

Author.belongsToMany(Genre, {through: AuthorGenre});
Genre.belongsToMany(Author, {through: AuthorGenre});

module.exports = {
  User,
  Product,
  CartProduct,
  Favorite,
  Author,
  Genre,
  Order,
  ProductGenre
};