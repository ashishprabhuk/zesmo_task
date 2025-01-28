import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = 'http://localhost:8000';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }
      const response = await axios.get(`${baseURL}/tasks/${userId}`);
      console.log("Fetched Tasks:", response.data);
      setTasks(response.data);
    } catch (error) {
      alert("Failed to fetch tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.post(`${baseURL}/tasks`, { title: newTask, status: "pending", userId });
      fetchTasks();
      setNewTask("");
    } catch (error) {
      alert("Failed to add task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`${baseURL}/tasks/${taskId}/${userId}`);
      fetchTasks();
    } catch (error) {
      alert("Failed to delete task.");
    }
  };

  const handleEditTask = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="task-list-page">
      <h2>Task List</h2>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="filter" className="form-label">
          Filter by Status:
        </label>
        <select
          id="filter"
          className="form-control w-50"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {tasks.length === 0 && (
        <>
          {localStorage.getItem("userId") ? (
            <p>No tasks available. Please add a task to get started!</p>
          ) : (
            <p>Please log in first to view and manage tasks.</p>
          )}
        </>
      )}
      {tasks.length > 0 && (
        <ul className="list-group">
          <h6 className="text-center">Add tasks here!</h6>
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: task.status === "completed" ? "#4bff54" : "#ffcc5e",
                color: "black",
              }}
            >
              {task.title}
              <div className="d-flex">
                <button
                  className="btn btn-primary w-50 btn-sm me-2"
                  onClick={() => handleEditTask(task._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
