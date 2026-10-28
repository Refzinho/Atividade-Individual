import Cabecalho from "@/components/Cabecalho";
import "./globals.css";

export const metadata = {
  title: "TreinaCreator | Gerenciador de treinamentos",
  description: "Cadastre, consulte, edite e organize treinamentos para criadores de conteúdo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Cabecalho />
        {children}
        <footer className="site-footer">
          <div className="shell footer-inner">
            <span>TreinaCreator • Projeto de Programação Front-End 01</span>
            <span>Next.js + Express • Dados em memória</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
