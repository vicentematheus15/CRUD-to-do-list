//definindo mysql como base de dados
const express = require("express");
const app = express();
const mysql2 = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

//cria a conexão com o banco de dados
const db = mysql2.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "senai",
    database: "empregados",
});

//CREATE - método POST
app.post("/create", (req, res) => {
    const nome = req.body.nome;
    const idade = req.body.idade;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anos = req.body.anos;

    db.query(
        "INSERT INTO empregados (nome, idade, pais, cargo, anos) VALUES (?,?,?,?,?)",
        [nome, idade, pais, cargo, anos],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result); // corrigido
            }
        }
    );
});

//SELECT - método GET
app.get("/empregados", (req, res) => { // corrigido: removido o ")" extra
    db.query(
        "SELECT * FROM empregados",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result); // corrigido
            }
        }
    );
});

//UPDATE - método PUT
app.put("/update", (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const idade = req.body.idade;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anos = req.body.anos;

    db.query(
        "UPDATE empregados SET nome=?, idade=?, pais=?, cargo=?, anos=? WHERE id=?", // corrigido
        [nome, idade, pais, cargo, anos, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Empregado atualizado com sucesso");
            }
        }
    );
});

//DELETE - método DELETE
app.delete("/deletar/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM empregados WHERE id=?",
        id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Empregado excluído com sucesso");
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Servidor rodando na porta 3001");
});
