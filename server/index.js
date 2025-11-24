//definindo mysql como base de dados
const express = require("express");
const app = express();
const mysql2 = require("mysql");
const cors = require ("cors");
app.use(cors());
app.use(express.json())


//cria a conexão com o banco de dados
const db = mysql2.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"senai",
    database:"empregados",
    port:3306
});

//CREATE metodo POST
//requisição para criar uma instancia do objeto "empregado", esperando uma resposta
app.post("/create",(req,res)=>{
    //cria constantes que vão receber os atributos do objeto (task) que estão do body da requisição
    const nome = req.body.nome;
    const idade = req.body.idade;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anos= req.body.anos;
    const id = req.body.id;

    //model: faz a query para inserir os atributos da task no banco de dados
    db.query('INSERT INTO empregados (nome, idade, pais, cargo, anos) VALUES (?,?,?,?,?)', [nome, idade, pais, cargo, anos],
        //controller: retorna a resposta para a requisição post com o código (500, 201)
        (err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                req.send(result)
            }
        } )
})

//SELECT
app.get("/empregados)", (req,res)=>{
    db.query("SELECT * FROM empregados",
        (err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                req.send(result)
            }
        } )
})

//metodo PUT
//requisição para atualizar algo do objeto "task", PASSANDO O ID DA INSTANCIA ESPECIFICA QUE DEVE SER ALTERADO COMO PARAMETRO e esperando uma resposta
app.put("/atualizar/:id", (req, res) => {
    //cria constantes que vão receber os atributos do objeto (task) que estão do body da requisição
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const completed = req.body.completed;
    const createdAt = req.body.createdAt ? formatDateForMySQL(req.body.createdAt) : null
    const id = req.params.id;

    //model: faz a query para alterar o atributo do objeto referente ao id da task no banco de dados
    db.query(
        "UPDATE task SET title=?, description=?, priority=?, completed=?, createdAt=? WHERE id=?",
        [title, description, priority, completed, createdAt, id],
        (err, result) => {
            //controller: retorna a resposta para a requisição put com o código (500, 404, 200)
            if (err) {
                res.status(500).json({ message: "Erro no servidor, verifique a resposta", error: err,createdAt:createdAt});
            } else if (result.affectedRows === 0) {
                res.status(404).json({ message: "Tarefa nao encontrada",taskId:id, affectedRows: result.affectedRows });
            } else {
                res.status(200).json({ message: "task atualizada com sucesso", taskId: id,affectedRows: result.affectedRows});
            }
        }
    );
})

//metodo delete
//requisição para deletar algo do objeto "task", PASSANDO O ID DA INSTANCIA ESPECIFICA QUE DEVE SER DELETADO COMO PARAMETRO e esperando uma resposta
app.delete("/deletar/:id",(req,res)=>{
    //cria uma const que recebe a requisição delete, o parametro que deve ser deletado e o ID de qual o objeto
    const id = req.params.id
    //model: faz a query para deletar o atributo do objeto referente ao id da task no banco de dados
    db.query("DELETE FROM task WHERE id=?",[id],(err,result)=>{
        //controller: retorna a resposta para a requisição put com o código (500, 404, 200)
        if(err){
            res.status(500).json({message:"Erro no servidor,verifique a resposta",error:err})
        }else if(result.affectedRows ===0){
            res.status(404).json({message:"Tarefa nao encontrada"})
        }else{
            res.status(200).json({message:"Tarefa deletada",taskId:id})
        }
    })

})


app.listen(3001,()=>{
    console.log("servidor rodando")
})
