import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  function saveEdit() {
    if (newText.trim() !== '') {
      onEdit(task.id, newText.trim());
    } else {
      setNewText(task.text);
    }
    setIsEditing(false);
  }

  return (
    <li className={task.completed ? 'task completed' : 'task'}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <div className="task-info">
        {isEditing ? (
          <input
            className="edit-input"
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />
        ) : (
          <span className="task-text">{task.text}</span>
        )}
        <span className="category">{task.category}</span>
      </div>

      <div className="task-buttons">
        {isEditing ? (
          <button onClick={saveEdit}>Save</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;