const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");

class Chat extends Model {}

Chat.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    receiver_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    modelName: "Chats",
    sequelize: connection,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Chat;
