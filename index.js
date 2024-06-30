  
  const express = require("express");
  const app= express();
  const bodyParser = require("body-parser");
  const connection  = require("./database/database");
  const Pergunta= require("./database/pergunta");
  const Resposta =require("./database/Resposta"); 

  //Database

  connection
    .authenticate()
    .then(() =>{
      console.log("conexção feita com o banco de dados")      
    })
    .catch((msgErro) =>{
      console.log("msgErro");
    } )

  

  //Estou dizendo para express usar o EJS como View engine/
  app.set('view engine','ejs');
  app.use(express.static('public'));


  app.use(bodyParser.urlencoded({extended:false})); // traduzir os dados enviados pelo formulario em JavaScript//
  app.use(bodyParser.json());



  //Rotas//
  app.get("/",(req, res) =>{                 //Pagina principal//
    Pergunta.findAll({raw:true,order:[
      ['id','DESC']
    ]}).then(perguntas => { //Metodo para listar todas as perguntas  e mandar para o then//
      res.render("index",{
        perguntas: perguntas           //criando a variavel perguntas e enviando para o front end//

      });
    });
  });
     

  app.get("/perguntar",(req,res)=>{       //Pagina perguntas//
    res.render("perguntar");
  })

  app.post("/salvarpergunta",(req,res) =>{  
    var titulo = req.body.titulo;       //POST recebe rotas de formularios com segurança//
    var descricao = req.body.descricao; 
          //POST recebe rotas de formularios com segurança//

    Pergunta.create({
      titulo: titulo,                //salvo no meu  banco de dados INSERT//
      descricao: descricao 
    }).then(() => {
        res.redirect("./");
    });
  });

  app.get("/pergunta/:id",(req,res) =>{
    var id = req.params.id;
    Pergunta.findOne({                     //Pesquisa as perguntas pelo ID//
      where: {id:id}
    }).then(pergunta =>{                
       if(pergunta!= undefined){ 

        Resposta.findAll({
          where:{perguntaId: pergunta.id},
          order:[
            ['id','DESC']
          ]
        }).then(respostas => {
          res.render("pergunta",{        
            pergunta: pergunta,
            respostas: respostas
          });
        });       // se for diferente de Undefined  encontrada//

       }else{      //Não encontrada//
         res.redirect("/");       
       }
    });
  })

  app.post("/responder",(req,res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
      corpo: corpo,
      perguntaId: perguntaId
    }).then(() =>{
      res.redirect("/pergunta/" +perguntaId)

    });

  });


 

  app.listen(8000,()=>{console.log("App rodand");});
  
  //ejs serve desenhar o html  dentro do Node.js e javaScript dentro do HTML//