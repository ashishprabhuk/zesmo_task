import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";

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
      const specificTask = response.data.find((task) => task._id === id);
      if (specificTask) {
        setTask(specificTask);
      } else {
        alert("Task not found.");
      }
      setLoading(false);
    } catch (error) {
      alert("Failed to fetch task.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleUpdateTask = async () => {
    try {
      const payload = { title: task.title, userId: task.userId };
      await axios.put(`${baseURL}/tasks/${task._id}`, payload);
      alert("Task updated successfully.");
    } catch (error) {
      alert("Failed to update task.");
    }
  };

  const handleCompleteTask = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.patch(`${baseURL}/tasks/${task._id}/complete/${userId}`);
      fetchTask();
      alert("Task marked as completed.");
    } catch (error) {
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
      alert("Failed to delete task.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  }

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-4" />;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Task Detail</h2>
      {task && task.title ? (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-between">

          <Button variant="primary" className="me-2" onClick={handleUpdateTask}>
            Save
          </Button>
          <Button variant="success" className="me-2" onClick={handleCompleteTask}>
            Mark as Complete
          </Button>
          <Button variant="danger" onClick={handleDeleteTask}>
            Delete Task
          </Button>
          </div>
          <div className="d-flex justify-content-center">
          <Button variant="secondary" className="mt-2 w-25 text-center " onClick={handleGoBack}> ← Back</Button>
          </div>
        </Form>
      ) : (
        <Alert variant="warning">Task not found.</Alert>
      )}
    </Container>
  );
};

export default TaskDetail;
