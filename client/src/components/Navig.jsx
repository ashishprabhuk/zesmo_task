import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";


const Navig = () => {
  const email = localStorage.getItem("email");
  const userID = localStorage.getItem("userId");
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Link to='/' className="text-decoration-none text-white fs-4" >Zesmo Tasks</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userID ? (
                <>
                  <span className="nav-link">Signed in as: {email}</span>
                  <button className="nav-link btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navig;
