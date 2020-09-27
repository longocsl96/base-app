import React, { useState } from 'react'
import { Lock, Mail } from 'react-feather'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  CardBody,
  FormGroup,
  Form,
  Label,
  Button,
  Input
} from 'reactstrap'
import '../assets/scss/pages/authentication.scss'

const Login = ({ loginAction }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onClickLogin = () => {
    loginAction({ username, password })
  }

  return (
    <Row className='m-0 justify-content-center'>
      <Col
        sm='8'
        xl='7'
        lg='10'
        md='8'
        className='d-flex justify-content-center'
      >
        <Card className='bg-authentication login-card rounded-0 mb-0 w-100'>
          <Row className='m-0'>
            <Col
              lg='6'
              className='d-lg-block d-none text-center align-self-center px-1 py-0'
            >
              <img
                src='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-4/static/media/login.fd58a052.png'
                alt='loginImg'
              />
            </Col>
            <Col lg='6' md='12' className='p-0'>
              <Card className='rounded-0 mb-0 px-2 login-tabs-container'>
                <CardHeader className='pb-1'>
                  <CardTitle>
                    <h4 className='mb-0'>Login</h4>
                  </CardTitle>
                </CardHeader>
                <CardBody className='pt-1'>
                  <FormGroup className='form-label-group position-relative has-icon-left'>
                    <Input
                      type='email'
                      placeholder='Email'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <Mail size={15} />
                    <Label>Email</Label>
                  </FormGroup>
                  <FormGroup className='form-label-group position-relative has-icon-left'>
                    <Input
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock size={15} />
                    <Label>Password</Label>
                  </FormGroup>
                  <Button color='primary' type='button' onClick={onClickLogin}>
                    <FormattedMessage id='Login' />
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default Login
