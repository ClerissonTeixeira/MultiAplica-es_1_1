import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [errorTasks, setErrorTasks] = useState(null);

  const API_BASE_URL = 'https://api-todo-list-448o.onrender.com';

  const fetchTasks = async () => {
    setLoadingTasks(true);
    setErrorTasks(null);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar tarefas. Código HTTP: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("❌ Erro ao buscar tarefas:", error);
      setErrorTasks("Erro ao carregar tarefas. Tente novamente mais tarde.");
    } finally {
      setLoadingTasks(false);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`Erro ao adicionar tarefa. Código HTTP: ${response.status}`);
      }

      const addedTask = await response.json();
      setTasks((prev) => [...prev, addedTask]);
    } catch (error) {
      console.error("❌ Erro ao adicionar tarefa:", error);
      setErrorTasks("Erro ao adicionar tarefa. Tente novamente.");
    }
  };

  const updateTask = async (id, updatedFields) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar tarefa. Código HTTP: ${response.status}`);
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("❌ Erro ao atualizar tarefa:", error);
      setErrorTasks("Erro ao atualizar tarefa. Tente novamente.");
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Erro ao deletar tarefa. Código HTTP: ${response.status}`);
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("❌ Erro ao deletar tarefa:", error);
      setErrorTasks("Erro ao deletar tarefa. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadingTasks,
        errorTasks,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
