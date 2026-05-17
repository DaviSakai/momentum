function HabitsPanel({ habits }) {
  const completedHabits = habits.filter((habit) => habit.completed).length;

  return (
    <article className="panel">
      <div className="panel-heading">
        <h2>Hábitos de hoje</h2>
        <span>{completedHabits}/{habits.length}</span>
      </div>

      <ul className="habit-list">
        {habits.map((habit) => (
          <li key={habit.name}>
            <span className={habit.completed ? 'check done' : 'check'} />
            <p>{habit.name}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default HabitsPanel;
