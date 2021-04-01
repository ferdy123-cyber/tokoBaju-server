const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");

class Listchat extends Model {}

Listchat.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    chat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    modelName: "Listchats",
    sequelize: connection,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Listchat;
