//aqui vai ficar a configuração do express

const express = require("express");
const cors = require("cors");

const app = express();  

app.use(cors());
app.use(express.json());


const treinamento = [
    {
        id: 1,
        titulo: "Como criar um canal do zero",
        descricao: "Nesse treinamento você vai apender a como criar um canal do absoluto zero",
        categoria: "Começo",
        duracao: "3h"
    }
];

app.post("/treinamento", (req, res) => {

    const adicionarTreinamento = {
        id: treinamento.length + 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria: req.body.categoria,
        duracao: req.body.duracao
    };

    treinamento.push(adicionarTreinamento);
    res.status(201).json(adicionarTreinamento);
});

app.listen(3001, () => {
    console.log("O seu localhost está rodando na porta 3001");
});

app.get("/treinamento", (req,res) => {
    res.json(treinamento);
});

