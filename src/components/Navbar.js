import React from 'react'

import { Navbar, Nav, Container } from 'react-bootstrap'

import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {logout} from '../actions'

function NavbarComponent() {
    
    const history = useHistory()
    const isLogged = useSelector(state => state.isLogged)
    const dispatch = useDispatch()

    const actionLogout = () => {
        dispatch(logout())
        history.push("/login")
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >User Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {isLogged ? <Nav.Link href='/user'>User List</Nav.Link> : ''}
                </Nav>
                <Nav>
                    {isLogged ? <Nav.Link onClick={actionLogout}>Logout</Nav.Link> : <Nav.Link href='/login'>Login</Nav.Link>}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
  }
  
  export default NavbarComponent;