import { Form, Button, Container, Row, Col, Card, Dropdown, DropdownButton, Alert } from "react-bootstrap";
import React, { useState } from 'react';
let tickets = ["A10", "B20"];


function ClientLayout() {
  const [ticketNumber1, setTicketNumber1] = useState(0);
  const [ticketNumber2, setTicketNumber2] = useState(0);
  const [ticketNumber3, setTicketNumber3] = useState(0);
  const [newTicket, setNewTicket] = useState(null);
  


  const centerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
  };

  const generateTicket = (service) => {
      let generatedTicket;
      switch (service) {
          case 1:
              generatedTicket = `A${ticketNumber1}`;
              setTicketNumber1(ticketNumber1 + 1);
              break;
          case 2:
              generatedTicket = `B${ticketNumber2}`;
              setTicketNumber2(ticketNumber2 + 1);
              break;
          case 3:
              generatedTicket = `C${ticketNumber3}`;
              setTicketNumber3(ticketNumber3 + 1);
              break;
          default:
              generatedTicket = 'Invalid Service';
      }

      // Aggiorna lo stato newTicket con il biglietto generato
      setNewTicket(generatedTicket);
      tickets.push(generatedTicket);
  };

  return (
      <Container style={centerStyle}>
          <Row>
              <Col>
                  <DropdownButton title="Get a Ticket">
                      <Dropdown.Item onClick={() => generateTicket(1)}>Servizio 1</Dropdown.Item>
                      <Dropdown.Item onClick={() => generateTicket(2)}>Servizio 2</Dropdown.Item>
                      <Dropdown.Item onClick={() => generateTicket(3)}>Servizio 3</Dropdown.Item>
                  </DropdownButton>
              </Col>
          </Row>
          {newTicket && (
              <Row>
                  <Col>
                      <Alert variant="success">
                          Your ticket is {newTicket}!
                      </Alert>
                  </Col>
              </Row>
          )}
      </Container>
  );
}

function OfficerLayout(){
  const [newCustomer, setNewCustomer] = useState(null);
    const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    const callCustomer = () => {
        let calledCustomer= tickets.pop();
        setNewCustomer(calledCustomer);
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

function MonitorLayout(){
  return(
    <>
    </>
  );
}

export { ClientLayout, OfficerLayout, MonitorLayout };