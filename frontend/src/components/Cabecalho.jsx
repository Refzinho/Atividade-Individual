import Link from "next/link";

export default function Cabecalho() {
  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" className="brand" aria-label="TreinaCreator - início">
            <span className="brand-name">Treina<span>Creator</span></span>
          </Link>

          <nav className="main-nav" aria-label="Navegação principal">
            <Link href="/">Início</Link>
            <Link href="/treinamento">Treinamentos</Link>
            <Link href="/adicionar-treinamento" className="nav-action">
              + Novo treinamento
            </Link>
          </nav>
        </div>
      </header>
      <div className="header-accent" />
    </>
  );
}
