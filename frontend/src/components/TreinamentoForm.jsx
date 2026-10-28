"use client";

import { useState } from "react";
import Link from "next/link";
import Alerta from "./Alerta";

const camposVazios = { titulo: "", descricao: "", categoria: "", duracao: "" };

export default function TreinamentoForm({
  valoresIniciais = camposVazios,
  aoSalvar,
  modo = "criar",
}) {
  const [campos, setCampos] = useState({ ...valoresIniciais });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function alterarCampo(evento) {
    const { name, value } = evento.target;
    setCampos((anteriores) => ({ ...anteriores, [name]: value }));
    setErro("");
    setSucesso("");
  }

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");
    setSucesso("");

    // trim() impede cadastrar apenas espaços em branco.
    const dados = {
      titulo: campos.titulo.trim(),
      descricao: campos.descricao.trim(),
      categoria: campos.categoria.trim(),
      duracao: campos.duracao.trim(),
    };

    if (dados.titulo.length < 3 || dados.descricao.length < 10 ||
        dados.categoria.length < 2 || dados.duracao.length < 2) {
      setErro("Confira os campos: título (3 caracteres), descrição (10), categoria (2) e duração (2).");
      return;
    }

    setSalvando(true);
    try {
      await aoSalvar(dados);
      setSucesso(
        modo === "criar"
          ? "Treinamento cadastrado com sucesso! Você pode cadastrar outro."
          : "Alterações salvas com sucesso!"
      );
      if (modo === "criar") setCampos({ ...camposVazios });
    } catch (falha) {
      setErro(falha.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="form-card">
      <form onSubmit={enviar} className="training-form">
        <div className="form-section-heading">
          <span className="section-dot" aria-hidden="true" />
          <div>
            <h2>Informações do treinamento</h2>
            <p>Preencha os campos abaixo. Todos são obrigatórios.</p>
          </div>
        </div>

        <div className="field">
          <label htmlFor="titulo">Título do treinamento *</label>
          <input id="titulo" name="titulo" type="text" required minLength={3}
            maxLength={80} value={campos.titulo} onChange={alterarCampo}
            placeholder="Ex.: Como criar um canal do zero" />
          <small>Um nome claro para identificar o conteúdo.</small>
        </div>

        <div className="field">
          <label htmlFor="descricao">Descrição *</label>
          <textarea id="descricao" name="descricao" required minLength={10}
            maxLength={500} rows={5} value={campos.descricao}
            onChange={alterarCampo}
            placeholder="Conte o que os participantes vão aprender..." />
          <small>Descreva o objetivo em pelo menos 10 caracteres.</small>
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="categoria">Categoria *</label>
            <input id="categoria" name="categoria" type="text" required minLength={2}
              maxLength={40} list="categorias" value={campos.categoria}
              onChange={alterarCampo} placeholder="Ex.: Edição" />
            <datalist id="categorias">
              <option value="Começo" />
              <option value="Edição" />
              <option value="Planejamento" />
              <option value="Crescimento" />
              <option value="Monetização" />
            </datalist>
          </div>
          <div className="field">
            <label htmlFor="duracao">Duração *</label>
            <input id="duracao" name="duracao" type="text" required minLength={2}
              maxLength={20} value={campos.duracao} onChange={alterarCampo}
              placeholder="Ex.: 2h30" />
          </div>
        </div>

        <Alerta tipo="erro">{erro}</Alerta>
        <Alerta>{sucesso}</Alerta>

        <div className="form-actions">
          <Link href="/treinamento" className="button button-light">Voltar à lista</Link>
          <button type="submit" disabled={salvando} className="button button-primary">
            {salvando ? "Salvando..." : modo === "criar" ? "Cadastrar treinamento" : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
