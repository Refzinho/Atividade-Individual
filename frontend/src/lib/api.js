// Todas as páginas usam estas funções para conversar com o Express.
// Se a porta da API mudar, configure NEXT_PUBLIC_API_URL no .env.local.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function requisitar(caminho, opcoes = {}) {
  let resposta;

  try {
    resposta = await fetch(`${API_URL}${caminho}`, {
      cache: "no-store",
      ...opcoes,
      headers: {
        ...(opcoes.body ? { "Content-Type": "application/json" } : {}),
        ...opcoes.headers,
      },
    });
  } catch {
    throw new Error(
      "Não foi possível conectar à API. Confira se o back-end está ligado na porta 3001."
    );
  }

  const dados = await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.mensagem || "Ocorreu um erro ao processar a solicitação.");
  }

  return dados;
}

export const api = {
  listar: () => requisitar("/treinamento"),
  buscar: (id) => requisitar(`/treinamento/${id}`),
  cadastrar: (treinamento) =>
    requisitar("/treinamento", {
      method: "POST",
      body: JSON.stringify(treinamento),
    }),
  atualizar: (id, treinamento) =>
    requisitar(`/treinamento/${id}`, {
      method: "PUT",
      body: JSON.stringify(treinamento),
    }),
  excluir: (id) => requisitar(`/treinamento/${id}`, { method: "DELETE" }),
};
