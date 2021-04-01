const { Model, DataTypes } = require("sequelize");
const connection = require("../connection");
const moment = require("moment");

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.NUMBER(10),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      default: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      default: new Date(),
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    modelName: "Reviews",
    sequelize: connection,
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

module.exports = Review;
