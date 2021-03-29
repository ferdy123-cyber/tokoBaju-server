const { INTEGER } = require("sequelize");
const { FLOAT } = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");

class Size extends Model {}

Size.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    size: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    percentage_price: {
      type: FLOAT(25),
      allowNull: false,
    },
  },
  {
    modelName: "Sizes",
    sequelize: connection,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Size;
