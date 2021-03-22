import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Signout } from '../../actions';

/**
* @author
* @function Header
**/

const Header = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(Signout())
    }
    const renderLoggedInLinks = () => {
        return (
            <li className="nav-item">
                <span onClick={logout} className="nav-link text-white">Signout</span> 
            </li>
        )
    } 
    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
                <li className="nav-item">
                    <NavLink className="nav-link" to='/signin'>Signin</NavLink> 
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to='/signup'>Signup</NavLink>
                </li>
            </Nav>
        )
    }
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex: 1}}>
        <Container fluid>
            <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {/* <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>                
                {
                    auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()
                }
            </Navbar.Collapse>
        </Container>
    </Navbar>
   )
}

export default Header