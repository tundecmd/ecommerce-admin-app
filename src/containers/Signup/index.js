import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layouts'
import Input from '../../components/UI/input';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions';
/**
* @author
* @function Signup
**/

const Signup = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);

  const userSignup = (e) => {
    e.preventDefault();
    
    const user = {
      firstName, lastName, email, password
    }

    dispatch(signup(user))
  }

  if (auth.authenticate) {
    return <Redirect to='/' />
  }
  if (user.loading) {
    return <p>Loading ...!</p>
  }
  return(
    <Layout>
      <Container>
        { user.message }
        <Row style={{ marginTop: "50px" }}>
          <Col md={{span: 6, offset: 3}}>
          <Form onSubmit={userSignup}>
            <Row>
              <Col md={6}>
                <Input 
                  label="firstName"
                  placeholder="First Name"
                  value={firstName}
                  type="text" 
                  onChange={(e) => { setFirstName(e.target.value) }}
                />
              </Col>
              <Col md={6}>
                <Input 
                  label="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  type="text"
                  onChange={(e) => { setLastName(e.target.value) }}
                />
              </Col>
            </Row>
              <Col>
                <Input 
                  label="Email"
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </Col>
              <Col>
                <Input 
                  label="Password"
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={(e) => { setPassword(e.target.value) }}
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