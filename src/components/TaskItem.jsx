function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      <div className="task-content">
        <span className="task-text">{task.text}</span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-button"
        title="Eliminar tarea"
      >
        🗑️
      </button>
    </li>
  );
}

export default TaskItem;