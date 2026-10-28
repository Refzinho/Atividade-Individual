"use client";

import Link from "next/link";
import TreinamentoForm from "@/components/TreinamentoForm";
import { api } from "@/lib/api";

export default function AdicionarTreinamento() {
  return (
    <main className="shell page-content">
      <div className="breadcrumbs"><Link href="/">Início</Link><span>/</span><Link href="/treinamento">Treinamentos</Link><span>/</span><strong>Novo</strong></div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">NOVO REGISTRO</span>
          <h1>Cadastrar treinamento</h1>
          <p>Compartilhe uma nova oportunidade de aprendizado com os criadores.</p>
        </div>
      </div>
      <TreinamentoForm modo="criar" aoSalvar={api.cadastrar} />
    </main>
  );
}
