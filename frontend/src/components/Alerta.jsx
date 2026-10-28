export default function Alerta({ tipo = "sucesso", children }) {
  if (!children) return null;

  return (
    <div
      className={`alerta alerta-${tipo}`}
      role={tipo === "erro" ? "alert" : "status"}
    >
      <span aria-hidden="true">{tipo === "erro" ? "!" : "✓"}</span>
      <span>{children}</span>
    </div>
  );
}
