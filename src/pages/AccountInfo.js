import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  Media,
  Button,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'
import DatePicker from '../components/DatePicker'

import Radio from '../components/Radio'

const AccountInfo = () => {
  return (
    <Card>
      <CardBody>
        <Media>
          <Media className='mr-1' left href='#'>
            <Media
              className='rounded-circle'
              object
              src={
                'https://storage.live.com/Users/-6155523327610065665/MyProfile/ExpressionProfile/ProfilePhoto:Win8Static,UserTileMedium,UserTileStatic'
              }
              alt='User'
              height='64'
              width='64'
            />
          </Media>
          <Media className='mt-25' body>
            <div className='d-flex flex-sm-row flex-column justify-content-start px-0'>
              <Button
                tag='label'
                className='mr-50 cursor-pointer'
                color='primary'
                outline
              >
                Upload Photo
                <Input type='file' name='file' id='uploadImg' hidden />
              </Button>
              <Button color='flat-danger'>Remove</Button>
            </div>
            <p className='text-muted mt-50'>
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p>
          </Media>
        </Media>
        <Form className='mt-2' onSubmit={(e) => e.preventDefault()}>
          <Row>
            <Col sm='12'>
              <FormGroup>
                <Label for='userName'>Username</Label>
                <Input id='userName' defaultValue='johny_01' />
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input id='name' defaultValue='John Doe' />
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup>
                <div className='d-inline-block mr-1'>
                  <Radio label='Male' defaultChecked={true} name='gender' />
                </div>
                <div className='d-inline-block mr-1'>
                  <Radio label='Female' defaultChecked={false} name='gender' />
                </div>
                <div className='d-inline-block'>
                  <Radio label='Other' defaultChecked={false} name='gender' />
                </div>
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup>
                <Label className='d-block' for='date'>
                  Date
                </Label>
                <DatePicker
                  className='form-control'
                  value={new Date()}
                  options={{ dateFormat: 'M \\ d \\, Y' }}
                />
              </FormGroup>
            </Col>
            <Col sm='12'>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input id='email' defaultValue='john@admin.com' />
              </FormGroup>
            </Col>
            <Col sm='12'>
              <Alert
                className='mb-2'
                color='warning'
                isOpen={false}
                toggle={false}
              >
                <p className='mb-0'>
                  Your email is not confirmed. Please check your inbox.
                  <span className='text-primary'> Resend Confirmation</span>
                </p>
              </Alert>
            </Col>
            <Col sm='12'>
              <FormGroup>
                <Label for='company'>Company</Label>
                <Input
                  id='company'
                  defaultValue='SnowMash Technologies Pvt Ltd'
                />
              </FormGroup>
            </Col>
            <Col className='d-flex justify-content-start flex-wrap' sm='12'>
              <Link to='/'>
                <Button className='mr-50' type='submit' color='danger'>
                  Cancel
                </Button>
              </Link>
              <Button type='submit' color='primary'>
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default AccountInfo
