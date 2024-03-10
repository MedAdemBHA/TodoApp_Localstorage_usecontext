import { useState, useEffect } from "react";
// import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import Todo from "./Todo";
import "./todos.css";
import { AuthContext } from "../App";
type Todo = {
  id: string;
  task: string;
  uniqId: string;
};

const TodoWrapper = () => {
  const authContext = useContext(AuthContext);

  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>({
    id: "0",
    task: "",
    uniqId: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value) {
      addTodo(value);
      setValue(""); // clear form after submission
    }
  };
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(savedTodos);
  }, []);

  const addTodo = (todo: string) => {
    const newTodos = [
      ...todos,
      { id: authContext.auth.id, task: todo, uniqId: uuidv4() },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const deleteTodo = (uniqId: string): void => {
    const newTodos = todos.filter((todo) => todo.uniqId !== uniqId);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  function handleEditClick(todo: Todo): void {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }
  console.log(todos);

  function handleEditInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setCurrentTodo({ ...currentTodo, task: e.target.value });
    console.log("currentTodo", { ...currentTodo, task: e.target.value });
  }
  console.log(currentTodo);

  function handleUpdateTodo(uniqId: string, updatedTodo: Todo): void {
    const updatedItems = todos.map((todo) =>
      todo.uniqId === uniqId ? updatedTodo : todo
    );
    setIsEditing(false);
    setTodos(updatedItems);
  }

  function handleEditFormSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    handleUpdateTodo(currentTodo.uniqId, currentTodo);
  }

  const del = () => {
    localStorage.clear();
    setTodos([]);
  };
  return (
    <div className="TodoWrapper">
      {isEditing ? (
        <form className="Todoform" onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>

          <input
            className="todo-input"
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.task}
            onChange={handleEditInputChange}
          />
          <button className="todo-btn" type="submit">
            Update
          </button>
          <button className="todo-btn" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <form className="Todoform" onSubmit={handleSubmit}>
          <h2>Add Todos</h2>

          <input
            type="text"
            className="todo-input"
            value={value}
            required
            placeholder="What is the task today ?"
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="todo-btn">
            Add Task
          </button>
        </form>
      )}
      <div className="todos">
        {todos
          .filter((todo) => todo.id === authContext.auth.id)
          .map((todo, key) => (
            <Todo
              task={todo}
              key={key}
              deleteTodo={deleteTodo}
              handleEditClick={handleEditClick}
            />
          ))}
      </div>
      <button className="todo-btn " onClick={del}>
        {" "}
        clear All{" "}
      </button>
    </div>
  );
};

export default TodoWrapper;
