const Sequelize = require('sequelize');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
// });

const sequelize = new Sequelize('techBlog_db', 'root', 'Nojo2679', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;