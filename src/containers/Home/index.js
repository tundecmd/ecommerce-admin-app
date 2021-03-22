import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Layout from "../../components/Layouts/index";
import './style.css';


/**
* @author
* @function Home
**/

const Home = (props) => {
  
  return(
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">sidebar</Col>
          <Col md={10} style={{marginLeft: 'auto'}}>container</Col>
        </Row>
      </Container>


      {/* <Jumbotron style={{ margin: "5rem", background: "#fff" }} className="text-center">
        <h1>Welcome to Admin Dashboard</h1>
      </Jumbotron> */}
    </Layout>
   )
  }

export default Home