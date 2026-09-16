import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('taskflow-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="app-header">
          <div className="header-top">
            <h1>
              <span className="logo-icon">✨</span>
              TaskFlow
            </h1>
            <button 
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <TaskForm onAddTask={addTask} />

        {tasks.length > 0 && (
          <div className="stats-bar">
            <span className="stat-pending">
              📋 {activeCount} pendiente{activeCount !== 1 ? 's' : ''}
            </span>
            <span className="stat-completed">
              ✅ {completedCount} completada{completedCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        <TaskList 
          tasks={tasks} 
          onToggleTask={toggleTask} 
          onDeleteTask={deleteTask} 
        />

        <footer className="app-footer">
          Hecho con 💜 por Jhoan Alexis Espinosa Marín
        </footer>
      </div>
    </div>
  );
}

export default App;