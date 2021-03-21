import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layouts'
import Input from '../../components/UI/input';
import { login } from "../../actions/index";
import { useDispatch } from 'react-redux';

/**
* @author
* @function Signin
**/

const Signin = (props) => {
  const dispatch = useDispatch()
  const userLogin = e => {
    e.preventDefault();
    
    const user = {
      email: 'lat@gmail.com', 
      password: '123456'
    }
    
    dispatch(login(user))
  } 
  
  return(
    <Layout>
      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col md={{span: 6, offset: 3}}>
          <Form onSubmit={userLogin}>
            <Col>
              <Input 
                label="Email"
                placeholder="Email"
                value=""
                type="email"
                onChange={() => {  }}
              />                                                                                                                                                                                                                                                                                                          m                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
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

export default Signin