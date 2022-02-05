import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/authActions/loginUser';

function LoginPage(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const LoginSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }
    return (
        <>
            <h1>Sign In</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={LoginSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to='/register'>
                        Register
                    </Link>
                </Col>
            </Row>
        </>
    );
}

export default LoginPage;