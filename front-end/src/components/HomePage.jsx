import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';

const HomePage = (props) => {
    const [selectedRole, setSelectedRole] = useState('Client');
    const [counters, setCounters] = useState([]);
    const [selectedCounter, setSelectedCounter] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        API.getCounters()
        .then((c) => {
            setCounters(c);
            setLoading(false);
        })
        .catch((err) => props.handleErrors(err));

    }, []);

    const handleRoleSelection = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleRouteSelection = () => {
        if (selectedRole === "Officer" && selectedCounter !== "") {
            navigate(`/${selectedRole}/${selectedCounter}`);
        } else {
            navigate(`/${selectedRole}`);
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6} className="text-center">
                    <h1>Welcome to Office Queue Management System</h1>
                    <p>Please select your role:</p>
                    <Form>
                        <Form.Group controlId="roleSelection">
                            <Form.Control as="select" value={selectedRole} onChange={handleRoleSelection}>
                                <option value="Client">Client</option>
                                <option value="Officer">Officer</option>
                                <option value="Monitor">Monitor</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    {selectedRole === "Officer" && (
                        <div>
                            <p>Please select a counter:</p>
                            <ul>
                                <Form.Group controlId="counterSelection">
                                    <Form.Control as="select" value={selectedCounter} onChange={(event) => setSelectedCounter(event.target.value)}>
                                        <option value="">Select a counter</option>
                                        {counters.map((counter) => (
                                            <option key={counter.id} value={counter.id}>Counter {counter.id}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </ul>
                        </div>
                    )}
                    <Button variant="primary" onClick={handleRouteSelection}>Go to {selectedRole} page</Button>
                </Col>
            </Row>
        </Container>
    );
};

export { HomePage };
