function DayPlanPanel({ timeline }) {
  return (
    <article className="panel">
      <div className="panel-heading">
        <h2>Plano do dia</h2>
        <span>{timeline.length} blocos</span>
      </div>

      <ol className="timeline">
        {timeline.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </article>
  );
}

export default DayPlanPanel;
