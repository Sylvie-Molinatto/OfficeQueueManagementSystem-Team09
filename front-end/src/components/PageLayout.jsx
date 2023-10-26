import { Button, Container, Row, Col, Card, DropdownButton, Alert, Spinner } from "react-bootstrap";
import { useState, useEffect, useContext } from 'react';
import MessageContext from "../messageCtx";
import API from '../API'


function ClientLayout() {

    const [services, setServices] = useState([]); // Array of empty objects for storing services
    const [ticket, setTicket] = useState(null); // Empty object for storing infos of the last created ticket
    const [isLoading, setIsLoading] = useState(true);
    const { handleErrors } = useContext(MessageContext);

    useEffect(() => {
        API.getServices()
            .then((x) => {
                setServices(x);
                setIsLoading(false);
            })
            .catch((err) => handleErrors(err));
    }, []);

    function MyAlert() {
        return (
            <Alert variant="success" className="mt-4">
                <Alert.Heading>TICKET CORRECTLY ISSUED</Alert.Heading>
                <hr />
                <p>QUEUE: {ticket.serviceCode}</p>
                <hr />
                <p>TICKET NUMBER: {ticket.id}</p>
                <hr />
                <p className="mb-0">CREATION DATE: {ticket.creationDate}</p>
            </Alert>
        );
    }

    function MyCard(props) {
        return (
            <Card className="mt-2" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{props.service.label}</Card.Title>
                    <Card.Text>{props.service.description}</Card.Text>
                    <Button variant="secondary" onClick={() => props.createTicket(props.service.code)}>GET TICKET</Button>
                </Card.Body>
            </Card>
        );
    }

    function ServiceList() {

        const createTicket = (code) => {
            API.createTicket(code)
                .then((x) => setTicket(x))
                .catch((err) => handleErrors(err));
        }

        return (
            <Container className="mt-4">
                {services.map((x) => <MyCard createTicket={createTicket} service={x} key={x.code} />)}
            </Container>
        )
    }

    return (
        <Container>
            <Row>
                <Col>
                    {isLoading ?
                        <Spinner animation="grow" variant="black" />
                        :
                        <ServiceList />
                    }
                </Col>
                <Col>
                    {ticket && <MyAlert />}
                </Col>
            </Row>
        </Container>
    );
}


function OfficerLayout() {
    const [newCustomer, setNewCustomer] = useState(null);
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };
    const { handleErrors } = useContext(MessageContext);

    const callCustomer = () => {
        //let calledCustomer= tickets.pop();
        //setNewCustomer(calledCustomer);
    };


    return (
        <Container style={centerStyle}>
            <Row>
                <Col>
                    <Button variant="primary" onClick={() => callCustomer()}>Call Next Customer</Button>
                </Col>
            </Row>
            {newCustomer && (
                <Row>
                    <Col>
                        <Alert variant="success">
                            Your next customer to be served is {newCustomer}!
                        </Alert>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

function MonitorLayout() {
    return (
        <>
        </>
    );
}

export { ClientLayout, OfficerLayout, MonitorLayout };