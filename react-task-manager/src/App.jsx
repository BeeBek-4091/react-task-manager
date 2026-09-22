import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  function addTask(text, category) {
    const newTask = {
      id: Date.now(),
      text,
      category,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="app">
      <h1>Personal Task Manager</h1>
      <p className="subtitle">Keep track of your daily tasks.</p>

      <TaskForm onAddTask={addTask} />

      {tasks.length === 0 ? (
        <p className="message">No tasks yet. Add your first task above.</p>
      ) : (
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      )}
    </main>
  );
}

export default App;