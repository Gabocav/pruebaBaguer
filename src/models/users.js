const sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

const users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario:{
        type: Sequelize.STRING
    },
    clave: {
        type: Sequelize.STRING
    },
    Nombre: {
        type: Sequelize.STRING
    },
    roleId: {
        type: Sequelize.STRING,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
});

const roles = sequelize.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Descripcion: {
        type: Sequelize.STRING
    }
});

users.belongsTo(roles);

module.exports = {users, roles};