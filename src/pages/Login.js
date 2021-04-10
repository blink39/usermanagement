import React, { useState } from 'react'

import { Button, Row, Col, Form, Container } from 'react-bootstrap'

function Login() {
    return (
        <Container className="mt-5">
            <Col md={{ span: 4, offset: 4}}>
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </div>
                </Form>
            </Col>
        </Container>
    )
}

export default Login;