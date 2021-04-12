import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Container, Row, Col, Button, InputGroup, FormControl, Table, Modal, Form } from 'react-bootstrap'

import {useSelector} from 'react-redux'

function NavbarComponent() {
    const [show, setShow] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [userData, setUsers] = useState()
    const [refresh, setRefresh] = useState(new Date())
    const userType = useSelector(state => state.userType)

    const [state , setState] = useState({
        id: 0,
        firstName: "",
        lastName: "",
        userType: "",
        username: "",
        password: "",
        searchName: ""
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const getDataUser = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_URL_DEV}/api/user/`
            })
            setUsers(res.data)
        } catch (err) {
            alert('Error get data')
        }
    }

    useEffect(() => {
        getDataUser()
    }, [refresh])

    function showDeleteUser(id) {
        handleShowDelete()
        setState(prevState => ({
            ...prevState,
            id: id
        }))
    }

    const deleteUser = async () => {
        try {
            const res = await axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_URL_DEV}/api/user/delete/${state.id}`
            })

            setState({ searchName : "" })
            setRefresh()
            handleCloseDelete()
        } catch (err) {
            alert('Error Delete User!')
        }
    }
    
    const insertUser = async () => {
        try {
            const res = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_URL_DEV}/api/user/insert/`,
                data: {
                    firstName : state.firstName,
                    lastName : state.lastName,
                    userType : state.userType,
                    username : state.username,
                    password : state.password
                }
            })
            
            setState({ searchName : "" })
            setRefresh()
            handleClose()
        } catch (err) {
            alert('Error Insert User!')
        }
    }

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const editSearchName = (e) => {
        setState({ searchName : e.target.value })
    }
    
    let userList
    if (userData) {
        let newUserData = userData

        if ( state.searchName != "") {
            newUserData = userData.filter(data => data.username.includes(state.searchName))
        }
        userList = newUserData.map((item, index) => {
            return (
                <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.username}</td>
                    {userType === 1 ? <td className="text-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16" onClick={()=>showDeleteUser(item.id)}>
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg></td> : ''}
                </tr>
            )
        })
    }

    return (
        <Container>
            <Row md={12}>
                <Col md={3} className="mt-3">
                    <h2>Customer List</h2>
                </Col>
                <Col md={3} className="mt-3">
                    {userType === 1 ? <Button variant="primary" onClick={handleShow}>New User</Button> : ''}
                </Col>
                <Col md={{ span: 3, offset: 3 }} className="text-right mt-3">
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg></InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={editSearchName} value={state.searchName}
                        placeholder="Search by username ..."
                        aria-label="Search by username ..."
                        />
                    </InputGroup>
                </Col>
            </Row>

            <Row className="mt-3">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        {userType === 1 ? <th>Action</th> : ''}
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </Table>
            </Row>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" id="firstName" value={state.firstName} onChange={handleChange} placeholder="Enter first name" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" id="lastName" value={state.lastName} onChange={handleChange} placeholder="Enter last name" />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>User Type</Form.Label>
                            <Form.Control type="text" id="userType" value={state.userType} onChange={handleChange} placeholder="Enter 0 for non admin / 1 for admin" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" id="username" value={state.username} onChange={handleChange} placeholder="Enter username" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" id="password" value={state.password} onChange={handleChange} placeholder="Password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={insertUser}>Submit</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showDelete}
                onHide={handleCloseDelete}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                 Are you sure to delete this user ?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteUser}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
  }
  
  export default NavbarComponent;