"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Alerta from "@/components/Alerta";
import { api } from "@/lib/api";
import "./treinamento.css";

export default function ListaTreinamentos() {
  const [treinamentos, setTreinamentos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [recarregar, setRecarregar] = useState(0);
  const [excluindoId, setExcluindoId] = useState(null);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;
    api.listar()
      .then((dados) => { if (ativo) { setTreinamentos(dados); setErro(""); } })
      .catch((falha) => { if (ativo) setErro(falha.message); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [recarregar]);

  async function excluirTreinamento(id) {
    const confirmou = window.confirm("Tem certeza que deseja excluir este treinamento?");
    if (!confirmou) return;

    setExcluindoId(id);
    setErro("");
    setMensagem("");
    try {
      await api.excluir(id);
      setTreinamentos((anteriores) => anteriores.filter((item) => item.id !== id));
      setMensagem("Treinamento excluído com sucesso.");
    } catch (falha) {
      setErro(falha.message);
    } finally {
      setExcluindoId(null);
    }
  }

  const termo = busca.toLocaleLowerCase("pt-BR").trim();
  const filtrados = treinamentos.filter((item) =>
    [item.titulo, item.categoria, item.descricao].some((valor) =>
      valor.toLocaleLowerCase("pt-BR").includes(termo)
    )
  );

  return (
    <main className="shell page-content">
      <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><strong>Treinamentos</strong></div>
      <div className="page-heading heading-with-action">
        <div>
          <span className="eyebrow">SEU CATÁLOGO</span>
          <h1>Todos os treinamentos</h1>
          <p>Encontre, organize e mantenha seus conteúdos sempre atualizados.</p>
        </div>
        <Link href="/adicionar-treinamento" className="button button-primary">+ Novo treinamento</Link>
      </div>

      <div className="list-toolbar">
        <div className="count-info"><strong>{treinamentos.length}</strong><span>treinamento{treinamentos.length === 1 ? "" : "s"} cadastrado{treinamentos.length === 1 ? "" : "s"}</span></div>
        <label className="search-field">
          <span className="sr-only">Buscar treinamento</span>
          <span aria-hidden="true">⌕</span>
          <input type="search" placeholder="Buscar por título ou categoria..."
            value={busca} onChange={(evento) => setBusca(evento.target.value)} />
        </label>
      </div>

      <Alerta tipo="erro">{erro}</Alerta>
      <Alerta>{mensagem}</Alerta>

      {carregando ? (
        <div className="loading-card" role="status">Carregando treinamentos...</div>
      ) : erro && treinamentos.length === 0 ? (
        <div className="empty-state">
          <h2>Não foi possível carregar a lista</h2>
          <p>Confira se o back-end está funcionando e tente novamente.</p>
          <button type="button" className="button button-primary" onClick={() => { setCarregando(true); setRecarregar((n) => n + 1); }}>Tentar novamente</button>
        </div>
      ) : filtrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">⌕</div>
          <h2>{busca ? "Nenhum resultado encontrado" : "Nenhum treinamento cadastrado"}</h2>
          <p>{busca ? "Experimente pesquisar por outro termo." : "Comece adicionando seu primeiro treinamento."}</p>
          {busca ? (
            <button type="button" className="button button-light" onClick={() => setBusca("")}>Limpar busca</button>
          ) : (
            <Link href="/adicionar-treinamento" className="button button-primary">Cadastrar treinamento</Link>
          )}
        </div>
      ) : (
        <div className="training-grid">
          {filtrados.map((treinamento) => (
            <article className="training-card" key={treinamento.id}>
              <div className="card-top"><span className="category-badge">{treinamento.categoria}</span><span className="card-id">#{String(treinamento.id).padStart(2, "0")}</span></div>
              <h2>{treinamento.titulo}</h2>
              <p className="training-description">{treinamento.descricao}</p>
              <div className="training-duration"><span aria-hidden="true">◷</span> Duração: <strong>{treinamento.duracao}</strong></div>
              <div className="card-actions">
                <Link href={`/editar-treinamentos/${treinamento.id}`} className="button button-outline">✎ Editar</Link>
                <button type="button" className="button button-danger"
                  onClick={() => excluirTreinamento(treinamento.id)}
                  disabled={excluindoId === treinamento.id}>
                  {excluindoId === treinamento.id ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
