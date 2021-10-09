import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function Header() {
  return (
    <Navbar expand="sm" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">VSmotors</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" navbarScroll>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Service Sheet</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <NavDropdown title="Manage" id="basic-nav-dropdown">
              <NavDropdown.Item href="/clients">Clients</NavDropdown.Item>
              <NavDropdown.Item href="/suppliers">Suppliers</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Vehicles</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Workers</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
