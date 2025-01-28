import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// const baseURL = "http://localhost:8000";
const baseURL = "https://zesmo-task.onrender.com";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchTask = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`${baseURL}/tasks/${userId}`);
      console.log("fetched tasks res:", response.data);
  
      const specificTask = response.data.find((task) => task._id === id);
  
      if (specificTask) {
        setTask(specificTask);
      } else {
        alert("Task not found.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Task ID from useParams:", id);
    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const payload = {
        title: task.title,
        userId: task.userId,
      };
      const response = await axios.put(`${baseURL}/tasks/${task._id}`, payload);
      alert("Task updated successfully.");
      console.log("Updated Task:", response.data);
    } catch (error) {
      console.error("Error updating task:", error.response || error.message);
      alert("Failed to update task.");
    }
  };

  const handleCompleteTask = async () => {
    try {
      const payload = { userId: task.userId };
      const userId = localStorage.getItem("userId");
      const response = await axios.patch(`${baseURL}/tasks/${task._id}/complete/${userId}`, payload);
      fetchTask();
      alert("Task marked as completed.");
      console.log("Updated Task:", response.data);
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to complete task.");
    }
  };

  const handleDeleteTask = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.delete(`${baseURL}/tasks/${task._id}/${userId}`);
      alert("Task deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="task-detail-page">
      <h2>Task Detail</h2>
      {task && task.title ? (
        <form>
          <div className="mb-3">
            <label htmlFor="taskName" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="taskName"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="taskStatus" className="form-label">
              Status
            </label>
            <select
              className="form-control"
              id="taskStatus"
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={handleUpdateTask}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-success me-2"
            onClick={handleCompleteTask}
          >
            Mark as Complete
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteTask}
          >
            Delete Task
          </button>
        </form>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
};

export default TaskDetail;
