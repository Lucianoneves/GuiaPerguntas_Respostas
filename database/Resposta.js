const sequelize = require ("sequelize");
const connection = require("./database");


const Resposta = connection.define('respostas',{
    corpo:{
        type: sequelize.TEXT,
        allowNull: false
    },                                     //campos e tipos na tabela //
    perguntaId:{
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force:false}).then(()=>{});   //Para não  recriar nova tabela já exixtente / 

module.exports = Resposta;
