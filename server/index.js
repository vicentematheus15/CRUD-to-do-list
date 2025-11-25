const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"senai",
    database:"empregados_crud"
});

app.post("/create",(req,res)=>{
    const nome = req.body.nome;
    const idade = req.body.idade;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anos = req.body.anos;
    const id = req.body.id;

    db.query("INSERT INTO empregado (nome,idade,pais,cargo,anos) VALUES(?,?,?,?,?)", [nome,idade,pais,cargo,anos], 
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Empregado registrado com sucesso");
            }
        }
    );
});

app.get("/empregado", (req,res)=>{
    db.query("SELECT * FROM empregado", 
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
});

app.put("/update", (req,res)=>{
    const id = req.body.id;
    const nome = req.body.nome;
    const idade = req.body.idade;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anos = req.body.anos;
    
    db.query("UPDATE empregado SET nome=?,idade=?,pais=?,cargo=?,anos=? WHERE id=?", [nome, idade, pais, cargo, anos, id],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Dados atualizados com sucesso");
            }
        }
    );
});

app.delete("/delete/:id", (req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM empregado WHERE id=?", id,
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Dados deletados.");
            }
        }
    );
});

app.listen(3001,()=>{
    console.log("Server up.")
});