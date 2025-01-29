import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, ListGroup, Alert } from "react-bootstrap";

// const baseURL = 'http://localhost:8000';
const baseURL = "https://zesmo-task.onrender.com";

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
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={6}>
          <h2 className="text-center mb-4">Task Manager</h2>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Enter new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Button variant="success" onClick={handleAddTask} className="w-100">
                Add Task
              </Button>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Filter by Status:</Form.Label>
              <Form.Select value={filter} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Col>
          </Row>
          {tasks.length === 0 && (
            <Alert variant="info">
              {localStorage.getItem("userId")
                ? "No tasks available. Please add a task to get started!"
                : "Please log in first to view and manage tasks."}
            </Alert>
          )}
          {tasks.length > 0 && (
            <ListGroup>
              {filteredTasks.map((task) => (
                <ListGroup.Item
                  key={task._id}
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: task.status === "completed" ? "#4bff54" : "#ffcc5e",
                    color: "black",
                  }}
                >
                  {task.title}
                  <div className="d-flex">
                    <Button variant="primary" size="sm" className="me-2 w-50" onClick={() => handleEditTask(task._id)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );  
};

export default TaskList;
