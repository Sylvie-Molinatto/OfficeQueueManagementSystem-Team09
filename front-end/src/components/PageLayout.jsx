import { Button, Container, Row, Col, Card, DropdownButton, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
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
    const { id } = useParams();
    const [counter, setCounter] = useState(null);
    const [loading, setLoading] = useState(true);
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };
    const { handleErrors } = useContext(MessageContext);

    useEffect(() => {
        API.getCounter(id)
            .then((c) => {
                setCounter(c);
                setLoading(false);
            })
            .catch((err) => handleErrors(err));

    }, [loading]);

    const handleCallCustomer = () => {
        API.callCustomer(id)
            .then(setLoading(true))
            .catch((err) => handleErrors(err));
    };

    const terminateService = () => {
        API.ticketServed(id)
            .then(setLoading(true))
            .catch((err) => handleErrors(err));
    };

    if (loading) {
        return (
            <Container style={centerStyle}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container style={centerStyle}>
            {counter.currentTicket && (
                <div>
                    <h3>You are now serving customer #{counter.currentTicket.id}!</h3>
                    <Row>
                        <Col>
                            <Alert variant="primary">
                                Service code: {counter.currentTicket.service_code}
                            </Alert>
                        </Col>
                    </Row>
                </div>
            )}
            <Row>{!counter.currentTicket &&
                <Col>
                    <Button variant="primary" onClick={handleCallCustomer} className="little-margin">Call Next Customer</Button>
                </Col>
            }
            </Row>
            <Row>
                {counter.currentTicket && (
                    <Col>
                        <Button variant="danger" onClick={terminateService} className="little-margin">Terminate Service</Button>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

function MonitorLayout() {

    const [counters, SetCounters] = useState([]); // Array of empty objects for storing counters info
    const [isLoading, setIsLoading] = useState(true);
    const { handleErrors } = useContext(MessageContext);

    useEffect(() => {
        API.getCounters()
            .then((x) => {
                SetCounters(x);
                setIsLoading(false);
            })
            .catch((err) => handleErrors(err));
    }, []);


    function CounterCard(props) {

        const [servingTicket, setServingTicket] = useState(null); // retrieve the ticket number that is being served by Counter Id
        const [isLoading, setIsLoading] = useState(true);

        const pollingInterval = 5000;

        const getServingTicket = () => {
            API.getServingTicketByCounterId(props.id)
                .then((x) => {
                    setServingTicket(x);
                    setIsLoading(false);
                })
                .catch((err) => handleErrors(err));
        };

        useEffect(() => {
            getServingTicket();
            const intervalId = setInterval(() => {
                getServingTicket();
            }, pollingInterval);

            return () => { clearInterval(intervalId); }; //Reset interval
        }, []);

        return (
            <>
                <Card className="mt-2" style={{ width: '24rem' }}>
                    <Card.Body>
                        <Card.Title className="text-center">COUNTER #{props.id}</Card.Title>
                        {isLoading ?
                            <Spinner animation="grow" variant="black" />
                            :
                            <Card.Text>{
                                servingTicket ?
                                    <Alert variant="warning" className="mt-4 text-center">Serving ticket number #{servingTicket} </Alert>
                                    :
                                    <Alert variant="danger" className="mt-4 text-center">Currently not serving anyone </Alert>
                            }
                            </Card.Text>
                        }
                    </Card.Body>
                </Card>
            </>
        );
    }

    function CounterList() {

        return (
            <Container className="mt-4">
                <Row>
                    {counters.map((x) => (
                        <div className="col-lg-4 col-md-6 col-sm-12" key={x.id}>
                            <CounterCard id={x.id} />
                        </div>
                    ))}
                </Row>
            </Container>
        )
    }

    return (
        <>
            {isLoading ?
                <Spinner animation="grow" variant="black" />
                :
                <CounterList />
            }
        </>
    );
}


export { ClientLayout, OfficerLayout, MonitorLayout };