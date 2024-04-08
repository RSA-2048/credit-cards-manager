import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = { username: 'test', password: 'password' }; // TODO: eplace with actual values when the backend user validation is implemented

        try {
            const response = await axios.post('https://localhost:7099/User/login', credentials);
            onSubmit(response.data.token);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="10">
                    <h1 className="display-4 mb-4">Log in</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Text className="text-muted">
                                Note: For demonstration purposes, you can log in with any username and password.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Log in
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginForm;