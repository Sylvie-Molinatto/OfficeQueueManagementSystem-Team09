import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = () => {

    return (
    <>
        <Navbar bg="dark" data-bs-theme="dark" expand="sm" variant="dark" fixed="top"  className="navbar-padding">
            <Link to="/" className='navbar-brand-link'>
                <Navbar.Brand>
                <i className="bi bi-person-workspace icon-size"> Office Queue Management System</i>
                </Navbar.Brand>
            </Link>

            <Nav className="ms-auto">
                <Link to="/login" className='navbar-brand-link'>
                    <i className="bi bi-person-circle icon-size"></i>
                </Link>
            </Nav>
        </Navbar>
    </>
    )
}

export { Navigation }; 