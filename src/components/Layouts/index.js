import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Header from '../Header';

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  return(
    <>
        <Header />
        <Container>
          { props.children }
        </Container>
        
    </>
   )

 }

export default Layout