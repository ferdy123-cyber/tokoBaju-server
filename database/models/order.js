const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    product_price: {
      type: DataTypes.FLOAT(10),
      allowNull: false,
    },
    product_discount: {
      type: DataTypes.FLOAT(10),
      allowNull: false,
    },
    product_qty: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
  },
  {
    modelName: "Orders",
    sequelize: connection,
    paranoid: true,
    underscored: true,
  }
);

module.exports = Order;
