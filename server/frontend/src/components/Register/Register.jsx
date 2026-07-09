import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';

// Helper to get Django CSRF token from cookies (required for POST requests)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const Register = () => {
    const navigate = useNavigate();
    const csrftoken = getCookie('csrftoken');

    // Form state - matches all 5 required fields
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Update state on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission to Django register endpoint
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/djangoapp/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify({
                    username: formData.username,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/djangoapp/login'), 2000);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="text-center text-white py-3" style={{backgroundColor: '#1c3a5e'}}>
                            <h3 className="mb-0">Sign Up</h3>
                            <p className="mb-0 small mt-1">Create your Best Cars account</p>
                        </Card.Header>
                        <Card.Body className="p-4">

                            {/* Success/Error alerts */}
                            {success && <Alert variant="success">{success}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>

                                {/* 1. Username Field */}
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Choose a username"
                                        required
                                    />
                                </Form.Group>

                                {/* 2. First Name Field */}
                                <Form.Group className="mb-3" controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </Form.Group>

                                {/* 3. Last Name Field */}
                                <Form.Group className="mb-3" controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                        required
                                    />
                                </Form.Group>

                                {/* 4. Email Field */}
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                {/* 5. Password Field */}
                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a secure password"
                                        minLength="6"
                                        required
                                    />
                                </Form.Group>

                                {/* Register Button */}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 py-2"
                                    style={{backgroundColor: '#2c5282', borderColor: '#2c5282'}}
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </Button>
                            </Form>

                            <div className="text-center mt-3 text-muted">
                                Already have an account?{' '}
                                <a href="/djangoapp/login" style={{color: '#2c5282'}}>Log in here</a>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
