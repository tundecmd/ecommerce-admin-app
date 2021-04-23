import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Layout from "../../components/Layouts/index";
import './style.css';
import { NavLink } from 'react-router-dom';


/**
* @author
* @function Home
**/

const Home = (props) => {
  
  return(
    <Layout sidebar>
      <Container>
        <Row></Row>
        <Row></Row>
      </Container>

      {/* <Jumbotron style={{ margin: "5rem", background: "#fff" }} className="text-center">
        <h1>Welcome to Admin Dashboard</h1>
      </Jumbotron> */}
    </Layout>
   )
  }

export default Home