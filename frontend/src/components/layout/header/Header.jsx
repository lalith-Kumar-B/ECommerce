import { React, useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import UserOptions from "./userOptions";

function Header({ isAuthenticated, user }) {
  const whiteText = { color: "white" };
  const [keyword, setKeyword] = useState("");
  const navigator = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigator(`/products/${keyword}`);
    } else {
      navigator("/products");
    }
  };

  return (
    <Navbar key="sm" expand="sm" className="bg-body-tertiary x" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" style={whiteText}>
          E Commerce
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-sm`}
          style={whiteText}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-sm`}
              style={whiteText}
            >
              E Commerce
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/" style={whiteText}>
                Home
              </Nav.Link>
              <Nav.Link href="/products" style={whiteText}>
                Products
              </Nav.Link>
              <Nav.Link href="#action3" style={whiteText}>
                Contact
              </Nav.Link>
              <Nav.Link href="#action4" style={whiteText}>
                About
              </Nav.Link>
              <Form className="d-flex me-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  style={whiteText}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  style={whiteText}
                  type="submit"
                  onClick={searchSubmitHandler}
                >
                  Search
                </Button>
              </Form>
              {isAuthenticated?<UserOptions user={user}/>:<VscAccount size={40} onClick={()=>{navigator("/auth")}}/>}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
