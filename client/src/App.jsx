import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import SignUp from "././components/SignUp";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import Navig from "./components/Navig";

const App = () => {
  return (
    <Router>
      <Navig/>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;