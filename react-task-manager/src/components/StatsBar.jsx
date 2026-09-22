function StatsBar({ active, completed }) {
  return (
    <p className="stats">
      Remaining: <strong>{active}</strong> | Completed: <strong>{completed}</strong>
    </p>
  );
}

export default StatsBar;