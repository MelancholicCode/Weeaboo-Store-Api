const sequelize = require('../db');
const {DataTypes} = require('sequelize');

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

const Cart = sequelize.define('cart', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const CartProduct = sequelize.define('cart_product', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: DataTypes.INTEGER, defaultValue: 1}
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
  address: {type: DataTypes.STRING, allowNull: false},
  generalPrice: {type: DataTypes.INTEGER, allowNull: false}
});

const OrderItem = sequelize.define('order_item', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  count: {type: DataTypes.INTEGER, allowNull: false},
  price: {type: DataTypes.INTEGER, allowNull: false}
});

const AuthorGenre = sequelize.define('author_genre', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const ProductGenre = sequelize.define('product_genre', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Favorite);
Favorite.belongsTo(User);

Cart.hasMany(CartProduct);
CartProduct.belongsTo(Cart);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasOne(Favorite);
Favorite.belongsTo(Product);

Product.hasOne(CartProduct);
CartProduct.belongsTo(Product);

Product.hasOne(OrderItem);
OrderItem.belongsTo(Product);

Author.hasMany(Product);
Product.belongsTo(Author);

Product.belongsToMany(Genre, {through: ProductGenre});
Genre.belongsToMany(Product, {through: ProductGenre});

Author.belongsToMany(Genre, {through: AuthorGenre});
Genre.belongsToMany(Author, {through: AuthorGenre});

module.exports = {
  User,
  Favorite,
  Cart,
  CartProduct,
  Order,
  OrderItem,
  Product,
  Genre,
  Author,
  ProductGenre,
  AuthorGenre
};