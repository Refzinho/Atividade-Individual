const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); 
app.use(express.json());

const treinamentos = [
  {
    id: 1,
    titulo: "Como criar um canal do zero",
    descricao: "Aprenda os primeiros passos para planejar e criar seu canal de conteúdo.",
    categoria: "Começo",
    duracao: "3h",
  },
  {
    id: 2,
    titulo: "Edição de vídeos na prática",
    descricao: "Conheça cortes, transições e técnicas para deixar seus vídeos mais envolventes.",
    categoria: "Edição",
    duracao: "2h30",
  },
  {
    id: 3,
    titulo: "Planejamento de conteúdo",
    descricao: "Organize ideias, monte um calendário e mantenha consistência nas publicações.",
    categoria: "Planejamento",
    duracao: "1h45",
  },
];

let proximoId = Math.max(0, ...treinamentos.map((item) => item.id)) + 1;

function lerId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({ mensagem: "ID do treinamento inválido." });
    return null;
  }
  return id;
}

function validarTreinamento(corpo) {
  const campos = [
    ["titulo", "Título", 3, 80],
    ["descricao", "Descrição", 10, 500],
    ["categoria", "Categoria", 2, 40],
    ["duracao", "Duração", 2, 20],
  ];

  const dados = {};
  for (const [chave, rotulo, minimo, maximo] of campos) {
    const valor = corpo?.[chave];
    if (typeof valor !== "string") {
      return { erro: `${rotulo} é obrigatório.` };
    }

    const texto = valor.trim();
    if (texto.length < minimo || texto.length > maximo) {
      return { erro: `${rotulo} deve ter entre ${minimo} e ${maximo} caracteres.` };
    }
    dados[chave] = texto;
  }
  return { dados };
}

app.get("/treinamento", (req, res) => {
  res.json(treinamentos);
});

app.get("/treinamento/:id", (req, res) => {
  const id = lerId(req, res);
  if (id === null) return;

  const encontrado = treinamentos.find((item) => item.id === id);
  if (!encontrado) {
    return res.status(404).json({ mensagem: "Treinamento não encontrado." });
  }
  res.json(encontrado);
});

app.post("/treinamento", (req, res) => {
  const resultado = validarTreinamento(req.body);
  if (resultado.erro) {
    return res.status(400).json({ mensagem: resultado.erro });
  }

  const novoTreinamento = { id: proximoId++, ...resultado.dados };
  treinamentos.push(novoTreinamento);
  res.status(201).json(novoTreinamento);
});

app.put("/treinamento/:id", (req, res) => {
  const id = lerId(req, res);
  if (id === null) return;

  const encontrado = treinamentos.find((item) => item.id === id);
  if (!encontrado) {
    return res.status(404).json({ mensagem: "Treinamento não encontrado." });
  }

  const resultado = validarTreinamento(req.body);
  if (resultado.erro) {
    return res.status(400).json({ mensagem: resultado.erro });
  }

  Object.assign(encontrado, resultado.dados);
  res.json(encontrado);
});

app.delete("/treinamento/:id", (req, res) => {
  const id = lerId(req, res);
  if (id === null) return;

  const indice = treinamentos.findIndex((item) => item.id === id);
  if (indice === -1) {
    return res.status(404).json({ mensagem: "Treinamento não encontrado." });
  }

  treinamentos.splice(indice, 1);
  res.json({ mensagem: "Treinamento excluído com sucesso." });
});

if (require.main === module) {
  const porta = Number(process.env.PORT) || 3001;
  app.listen(porta, () => console.log(`API disponível em http://localhost:${porta}`));
}

module.exports = app;
