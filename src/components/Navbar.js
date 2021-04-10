import React from 'react'
import {Link} from 'react-router-dom'

import { Navbar, Nav, Container } from 'react-bootstrap'

function NavbarComponent() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >User Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href='/user'>User List</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href='/login'>Login</Nav.Link>
                    <Nav.Link>Logout</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
  }
  
  export default NavbarComponent;