import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={`shell ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className="eyebrow"><span className="eyebrow-dot" /> SEU ESPAÇO DE APRENDIZAGEM</span>
            <h1>Grandes criadores <span>começam aprendendo.</span></h1>
            <p>
              Organize seus treinamentos, acompanhe seus conteúdos e mantenha
              tudo em um só lugar. Simples, rápido e do seu jeito.
            </p>
            <div className={styles.heroActions}>
              <Link href="/treinamento" className="button button-primary button-large">
                Explorar treinamentos <span aria-hidden="true">→</span>
              </Link>
              <Link href="/adicionar-treinamento" className="button button-light button-large">
                + Adicionar treinamento
              </Link>
            </div>
            <div className={styles.heroNote}>
              <span className={styles.noteIcon}>✓</span>
              Um gerenciador pensado para quem cria conteúdo.
            </div>
          </div>

          <div className={styles.preview} aria-label="Prévia de um plano de treinamentos">
            <div className={styles.previewTop}>
              <span className={styles.previewTag}>PAINEL DE ESTUDOS</span>
              <span className={styles.previewDots}>•••</span>
            </div>
            <div className={styles.previewHeading}>
              <div className={styles.previewIcon}>✦</div>
              <div>
                <strong>Minha jornada criativa</strong>
                <p>Conhecimento em cada etapa</p>
              </div>
            </div>
            <div className={styles.previewList}>
              <div><span className={styles.stepNumber}>01</span><span><strong>Comece do zero</strong><small>Fundamentos para criar</small></span><span className={styles.check}>✓</span></div>
              <div><span className={styles.stepNumber}>02</span><span><strong>Edite com confiança</strong><small>Conteúdos mais envolventes</small></span><span className={styles.check}>✓</span></div>
              <div><span className={styles.stepNumber}>03</span><span><strong>Planeje e cresça</strong><small>Ideias que saem do papel</small></span><span className={styles.arrow}>↗</span></div>
            </div>
            <div className={styles.previewBottom}>
              <span>Organização que inspira.</span>
              <span>✦</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`shell ${styles.features}`} aria-labelledby="features-title">
        <div className={styles.featureIntro}>
          <span className="eyebrow">TUDO O QUE VOCÊ PRECISA</span>
          <h2 id="features-title">Seu aprendizado, organizado.</h2>
          <p>As operações essenciais em uma interface simples de usar.</p>
        </div>
        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <span className={styles.featureIcon}>▤</span>
            <h3>Visualize seus conteúdos</h3>
            <p>Consulte treinamentos, suas categorias, durações e descrições.</p>
          </article>
          <article className={styles.featureCard}>
            <span className={styles.featureIcon}>＋</span>
            <h3>Cadastre novas ideias</h3>
            <p>Adicione conteúdos de maneira rápida com um formulário guiado.</p>
          </article>
          <article className={styles.featureCard}>
            <span className={styles.featureIcon}>✎</span>
            <h3>Mantenha tudo atualizado</h3>
            <p>Edite ou exclua registros sempre que seus planos mudarem.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
