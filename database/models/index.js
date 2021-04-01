const sequelize = require("../connection");
const User = require("./user");
const Product = require("./product");
const Order = require("./order");
const Image = require("./image");
const Size = require("./size");
const Transaction = require("./transaction");
const Review = require("./review");
const Chat = require("./chat");
const Listchat = require("./listchat");

User.hasMany(Product, {
  as: "products",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Order, {
  as: "orders",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Order.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Transaction, {
  as: "transactions",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Review, {
  as: "reviews",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Review.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Transaction.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.hasMany(Size, {
  as: "sizes",
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Size.belongsTo(Product, {
  as: "products",
  foreignKey: "product_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.hasMany(Image, {
  as: "images",
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Image.belongsTo(Product, {
  as: "products",
  foreignKey: "product_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.hasMany(Order, {
  as: "orders",
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Order.belongsTo(Product, {
  as: "products",
  foreignKey: "product_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Transaction.hasMany(Order, {
  as: "orders",
  foreignKey: "transaction_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Order.belongsTo(Transaction, {
  as: "transactions",
  foreignKey: "transaction_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Product.hasMany(Review, {
  as: "reviews",
  foreignKey: "product_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Review.belongsTo(Product, {
  as: "product",
  foreignKey: "product_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Chat, {
  as: "chats",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Chat.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Listchat, {
  as: "listchats",
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Listchat.belongsTo(User, {
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Chat.hasMany(Listchat, {
  as: "listchats",
  foreignKey: "chat_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Listchat.belongsTo(Chat, {
  as: "chats",
  foreignKey: "chat_id",
  targetKey: "id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  sequelize,
  User,
  Product,
  Image,
  Size,
  Order,
  Transaction,
  Review,
  Chat,
  Listchat,
};
