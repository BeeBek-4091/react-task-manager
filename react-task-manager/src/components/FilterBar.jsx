function FilterBar({ filter, onFilterChange }) {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <div className="filters">
      {filters.map((item) => (
        <button
          key={item}
          className={filter === item ? 'active-filter' : ''}
          onClick={() => onFilterChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;