import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Personal');

  function handleSubmit(event) {
    event.preventDefault();

    if (text.trim() === '') return;

    onAddTask(text.trim(), category);
    setText('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option>Personal</option>
        <option>Work</option>
        <option>Urgent</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;