import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  function handleAddTask(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newTask: Task = {
      id: uuidv4(),
      name: taskInput,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  }

  function handleToggleComplete(id: string): void {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleRemoveTask(id: string): void {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleUpdateTask(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (currentTask) {
      setTasks(
        tasks.map((task) =>
          task.id === currentTask.id ? { ...task, name: taskInput } : task
        )
      );
      setTaskInput("");
      setIsEditing(false);
      setCurrentTask(null);
    }
  }

  function startEditTask(task: Task): void {
    setIsEditing(true);
    setCurrentTask(task);
    setTaskInput(task.name);
  }

  return (
    <div className="todo-container min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2023/10/10/12/36/lofi-8306349_1280.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-70 blur-lg"></div>
      <div className="relative z-10 w-full max-w-md">
        <form
          className="bg-gray-800 bg-opacity-90 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          onSubmit={isEditing ? handleUpdateTask : handleAddTask}
        >
          <div className="mb-4">
            <label
              htmlFor="task"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Task Name
            </label>
            <input
              type="text"
              name="task"
              id="task"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900"
              placeholder="Enter your task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              {isEditing ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>

        <div className="tasks-list">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item p-4 mb-2 shadow-md rounded border-l-4 ${
                task.completed ? "bg-green-800 border-green-500" : "bg-gray-900 border-gray-700"
              }`}
            >
              <div className="task-info flex justify-between items-center">
                <span
                  className={`task-name ${task.completed ? "line-through text-gray-500" : "text-gray-300"}`}
                >
                  {task.name}
                </span>
                <div className="task-actions flex space-x-2">
                  <button
                    onClick={() => handleToggleComplete(task.id)}
                    className="text-xs bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => startEditTask(task)}
                    className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
