import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import StatsBar from './components/StatsBar';
import AISummary from './components/AISummary';
import './App.css';

const sampleTasks = [
  { id: 1, text: 'Finish React project', category: 'Urgent', completed: false },
  { id: 2, text: 'Buy groceries', category: 'Personal', completed: false },
  { id: 3, text: 'Reply to team emails', category: 'Work', completed: false },
  { id: 4, text: 'Go for a 20 minute walk', category: 'Personal', completed: true },
];

function App() {
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : sampleTasks;
});
  const [filter, setFilter] = useState('All');
  useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);
  function addTask(text, category) {
    const newTask = { id: Date.now(), text, category, completed: false };
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

  function editTask(id, newText) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="app">
      <h1>Personal Task Manager</h1>
      <p className="subtitle">Keep track of your daily tasks.</p>

      <TaskForm onAddTask={addTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <StatsBar active={activeCount} completed={completedCount} />
      {tasks.length > 0 && <AISummary tasks={tasks} />}

      {tasks.length === 0 ? (
        <p className="message">No tasks yet. Add your first task above.</p>
      ) : filteredTasks.length === 0 ? (
        <p className="message">No tasks match this filter.</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      )}
    </main>
  );
}

export default App;