const { Model, DataTypes } = require('sequelize')
const connection = require('../connection')

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        default: new Date()
    },
    updated_at: {
        type: DataTypes.DATE,
        default: new Date()
    },
    deleted_at: {
        type: DataTypes.DATE
    }
}, {
    modelName: 'Users',
    sequelize: connection,
    paranoid: true,
    timestamps: true,
    underscored: true
})

module.exports = User