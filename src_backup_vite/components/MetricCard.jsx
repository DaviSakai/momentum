function MetricCard({ label, value, detail, status }) {
  return (
    <article className="metric-card">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <p>{detail}</p>
      <small>{status}</small>
    </article>
  );
}

export default MetricCard;
