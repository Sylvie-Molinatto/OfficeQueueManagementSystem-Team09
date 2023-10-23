import { Form, Button, Container, Row, Col, Card, Dropdown, DropdownButton, Alert } from "react-bootstrap";
import React, { useState } from 'react';


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
  return(
    <>
    </>
  );
}

function MonitorLayout(){
  return(
    <>
    </>
  );
}

export { ClientLayout, OfficerLayout, MonitorLayout };