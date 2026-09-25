import { useState } from "react";
import "./App.css";

const FILTERS = {
  all: (todos) => todos,
  active: (todos) => todos.filter((t) => !t.done),
  completed: (todos) => todos.filter((t) => t.done),
};

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React basics", done: true },
    { id: 2, text: "Build a Todo App", done: false },
    { id: 3, text: "Deploy it to Vercel", done: false },
  ]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  function addTodo(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.done));
  }

  const visibleTodos = FILTERS[filter](todos);
  const activeCount = todos.filter((t) => !t.done).length;

  return (
    <div className="app">
      <div className="card">
        <h1>My Tasks</h1>

        <form className="add-form" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="What do you need to do?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {todos.length === 0 ? (
          <p className="empty">No tasks yet. Add one above 🙂</p>
        ) : (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <li key={todo.id} className={todo.done ? "done" : ""}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete task"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="footer">
          <span>{activeCount} item{activeCount !== 1 ? "s" : ""} left</span>

          <div className="filters">
            {Object.keys(FILTERS).map((key) => (
              <button
                key={key}
                className={filter === key ? "active" : ""}
                onClick={() => setFilter(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <button className="clear-btn" onClick={clearCompleted}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
