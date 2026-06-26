function CardResumo({ title, value, subtitle, variant = 'base' }) {
  return (
    <article className={`card ${variant}`}>
      <div className="card-top">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
      <p>{subtitle}</p>
    </article>
  );
}

export default CardResumo;
