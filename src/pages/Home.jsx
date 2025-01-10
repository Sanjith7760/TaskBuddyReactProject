import React, { useState } from 'react';

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask(''); // Clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      // Remove task from current category
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      // Add task to target category
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  // Delete task from a category
  const deleteTask = (category, taskToDelete) => {
    setTasks((prevTasks) => {
      // Remove task from category
      const updatedCategory = prevTasks[category].filter(
        (t) => t !== taskToDelete
      );
      return { ...prevTasks, [category]: updatedCategory };
    });
  };

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent form reload
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="add-task-button"
          onClick={addTask}
        >
          ADD TASK
        </button>
      </form>
      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>To-Do Tasks</h2>
          <ul className="task-list">
            {tasks.todo.map((t, index) => (
              <li key={index}>
                {t}
                <div className="task-actions">
                  <button
                    className="move-button"
                    onClick={() => moveTask('todo', 'ongoing', t)}
                  >
                    Move to Ongoing
                  </button>
                  <button
                    className="move-button"
                    onClick={() => moveTask('todo', 'completed', t)}
                  >
                    Move to Completed
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask('todo', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing Tasks</h2>
          <ul className="task-list">
            {tasks.ongoing.map((t, index) => (
              <li key={index}>
                {t}
                <div className="task-actions">
                  <button
                    className="move-button"
                    onClick={() => moveTask('ongoing', 'todo', t)}
                  >
                    Move to To-Do
                  </button>
                  <button
                    className="move-button"
                    onClick={() => moveTask('ongoing', 'completed', t)}
                  >
                    Move to Completed
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask('ongoing', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul className="task-list">
            {tasks.completed.map((t, index) => (
              <li key={index}>
                {t}
                <div className="task-actions">
                  <button
                    className="move-button"
                    onClick={() => moveTask('completed', 'todo', t)}
                  >
                    Move to To-Do
                  </button>
                  <button
                    className="move-button"
                    onClick={() => moveTask('completed', 'ongoing', t)}
                  >
                    Move to Ongoing
                  </button>
                  <button
                                        className="delete-button"
                    onClick={() => deleteTask('completed', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;