"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import TreinamentoForm from "@/components/TreinamentoForm";
import Alerta from "@/components/Alerta";
import { api } from "@/lib/api";

export default function EditarTreinamento() {
  const { id } = useParams(); // Lê o trecho [id] do endereço da página.
  const [treinamento, setTreinamento] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    api.buscar(id)
      .then((dados) => { if (ativo) setTreinamento(dados); })
      .catch((falha) => { if (ativo) setErro(falha.message); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, [id]);

  return (
    <main className="shell page-content">
      <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><Link href="/treinamento">Treinamentos</Link><span>/</span><strong>Editar</strong></div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">ATUALIZAR REGISTRO</span>
          <h1>Editar treinamento</h1>
          <p>Revise as informações e salve suas alterações.</p>
        </div>
      </div>

      {carregando && <div className="loading-card" role="status">Carregando informações do treinamento...</div>}
      {!carregando && erro && (
        <div className="form-card"><Alerta tipo="erro">{erro}</Alerta><Link href="/treinamento" className="button button-light">Voltar à lista</Link></div>
      )}
      {!carregando && treinamento && (
        <TreinamentoForm
          key={treinamento.id}
          modo="editar"
          valoresIniciais={treinamento}
          aoSalvar={(dados) => api.atualizar(id, dados)}
        />
      )}
    </main>
  );
}
