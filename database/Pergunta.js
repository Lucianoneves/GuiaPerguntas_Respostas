const sequelize = require ("sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas',{          // nome da tabela no workbench//
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },                                     //campos e tipos na tabela //
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false}).then(()=>{});   //Para não  recriar nova tabela já exixtente / 

module.exports = Pergunta;