import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {

    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Link to="/" className='navbar-brand-link notLink'>
                <Navbar.Brand href="">
                    <i className="bi bi-person-workspace icon-size"> Office Queue Management System</i>
                </Navbar.Brand>
            </Link>
          <Nav className="md-auto" activeKey={location.pathname}>
            <Nav.Link href="/" active className="active" eventKey="/">Client</Nav.Link>
            <Nav.Link href="/Officer">Officer</Nav.Link>
            <Nav.Link href="/Monitor">Monitor</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export { Navigation }; 