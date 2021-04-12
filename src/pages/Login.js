import React, { useState } from 'react'
import axios from 'axios'

import { Button, Col, Form, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import {useDispatch} from 'react-redux'
import {setUserType} from '../actions'

function Login() {
    
    const history = useHistory()
    const dispatch = useDispatch()

    const [user, setUser] = useState()
    const [state , setState] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const getDataUser = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_URL_DEV}/api/user/loginUser/${state.username},${state.password}`
            })
            setUser(res.data)
            alert(res.data.errStr)
            if ( res.data.errNum == 0 ) {
                dispatch(setUserType(res.data.userData.user_type))
                history.push("/user")
            }
        } catch (err) {
            alert('Error get data')
        }
    }

    return (
        <Container className="mt-5">
            <Col md={{ span: 4, offset: 4}}>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" id="username" value={state.username} onChange={handleChange} placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" value={state.password} onChange={handleChange} placeholder="Enter password" />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" onClick={getDataUser}>
                            Login
                        </Button>
                    </div>
                </Form>
            </Col>
        </Container>
    )
}

export default Login;