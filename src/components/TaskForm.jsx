import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onAddTask(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe una nueva tarea..."
        className="task-input"
      />
      <button type="submit" className="add-button" title="Agregar tarea">
        +
      </button>
    </form>
  );
}

export default TaskForm;