const { test } = require("node:test");
const assert = require("node:assert/strict");
const { once } = require("node:events");
const app = require("../server");

test("API permite listar, cadastrar, editar, excluir e valida os dados", async (t) => {
  const servidor = app.listen(0, "127.0.0.1");
  await once(servidor, "listening");
  t.after(() => servidor.close());
  const endereco = `http://127.0.0.1:${servidor.address().port}`;

  async function chamar(caminho, metodo = "GET", corpo) {
    const resposta = await fetch(`${endereco}${caminho}`, {
      method: metodo,
      headers: corpo ? { "Content-Type": "application/json" } : {},
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    return { status: resposta.status, dados: await resposta.json() };
  }

  const inicial = await chamar("/treinamento");
  assert.equal(inicial.status, 200);
  assert.ok(inicial.dados.length >= 1);

  const invalido = await chamar("/treinamento", "POST", { titulo: " " });
  assert.equal(invalido.status, 400);

  const exemplo = {
    titulo: "Treinamento de teste",
    descricao: "Descrição válida para testar a API.",
    categoria: "Edição",
    duracao: "2h",
  };
  const cadastro = await chamar("/treinamento", "POST", exemplo);
  assert.equal(cadastro.status, 201);
  const id = cadastro.dados.id;

  const consulta = await chamar(`/treinamento/${id}`);
  assert.equal(consulta.dados.titulo, exemplo.titulo);

  const edicao = await chamar(`/treinamento/${id}`, "PUT", {
    ...exemplo,
    titulo: "Treinamento atualizado",
  });
  assert.equal(edicao.status, 200);
  assert.equal(edicao.dados.titulo, "Treinamento atualizado");

  const exclusao = await chamar(`/treinamento/${id}`, "DELETE");
  assert.equal(exclusao.status, 200);
  assert.equal((await chamar(`/treinamento/${id}`)).status, 404);

  const novo = await chamar("/treinamento", "POST", exemplo);
  assert.equal(novo.status, 201);
  assert.ok(novo.dados.id > id); // O ID excluído não é reutilizado.
  assert.equal((await chamar("/treinamento/abc")).status, 400);
});
