function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'task completed' : 'task'}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <div className="task-info">
        <span className="task-text">{task.text}</span>
        <span className="category">{task.category}</span>
      </div>

      <div className="task-buttons">
        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;