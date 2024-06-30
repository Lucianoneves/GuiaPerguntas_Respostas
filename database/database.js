const sequelize = require('sequelize');

const connection = new sequelize('guiaperguntas','root','2287',{  //Criaçã da conecção do mysq com o banco de dados nome do Banco  /
    host: 'localhost',   
    dialect: 'mysql'
});

module.exports = connection;