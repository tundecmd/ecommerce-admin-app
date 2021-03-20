import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layouts'
import Input from '../../components/UI/input';

/**
* @author
* @function Signup
**/

const Signup = (props) => {
  return(
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{span: 6, offset: 3}}>
          <Form>
            <Row>
              <Col md={6}>
                <Input 
                  label="firstName"
                  placeholder="First Name"
                  value=""
                  type="text" 
                  onChange={() => {  }}
                />
              </Col>
              <Col md={6}>
                <Input 
                  label="lastName"
                  placeholder="Last Name"
                  value=""
                  type="text"
                  onChange={() => {  }}
                />
              </Col>
            </Row>
              <Col>
                <Input 
                  label="Email"
                  placeholder="Email"
                  value=""
                  type="email"
                  onChange={() => {  }}
                />
              </Col>
              <Col>
                <Input 
                  label="Password"
                  placeholder="Password"
                  value=""
                  type="password"
                  onChange={() => {  }}
                />
              </Col>            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Col>
        </Row>
    </Container>
  </Layout>
  )
}

export default Signup