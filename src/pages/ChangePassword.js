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
  FormGroup
} from 'reactstrap'
import * as Yup from 'yup'
import { Field, Formik } from 'formik'
import { FormattedMessage } from 'react-intl'

const formSchema = Yup.object().shape({
  oldpass: Yup.string().required('Required'),
  newpass: Yup.string().required('Required'),
  confirmpass: Yup.string()
    .oneOf([Yup.ref('newpass'), null], () => <FormattedMessage id="changePassword.passwordMustMatch"/>)
    .required('Required')
})

const ChangePassword = () => {
  return (
    <Card>
      <CardBody>
        <Row className='pt-1'>
          <Col sm='12'>
            <Formik
              initialValues={{
                oldpass: '',
                newpass: '',
                confirmpass: ''
              }}
              validationSchema={formSchema}
            >
              {({ errors, touched }) => (
               <Form className='mt-2' onSubmit={(e) => e.preventDefault()}>
                  <FormGroup>
                    <Field
                      name='oldpass'
                      id='oldpass'
                      className={`form-control ${
                        errors.oldpass && touched.oldpass && 'is-invalid'
                      }`}
                      placeholder='Old Password'
                    />
                    {errors.oldpass && touched.oldpass ? (
                      <div className='text-danger'>{errors.oldpass}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name='newpass'
                      placeholder='New Password'
                      id='newpass'
                      className={`form-control ${
                        errors.newpass && touched.newpass && 'is-invalid'
                      }`}
                    />
                    {errors.newpass && touched.newpass ? (
                      <div className='text-danger'>{errors.newpass}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name='confirmpass'
                      id='confirmpass'
                      className={`form-control ${
                        errors.confirmpass &&
                        touched.confirmpass &&
                        'is-invalid'
                      }`}
                      placeholder='Confirm Password'
                    />
                    {errors.confirmpass && touched.confirmpass ? (
                      <div className='text-danger'>{errors.confirmpass}</div>
                    ) : null}
                  </FormGroup>
                  <div className='d-flex justify-content-start flex-wrap'>
                    <Link>
                      <Button
                        className='mb-1 mr-1 '
                        color='danger'
                        type='reset'
                        outline
                      >
                        Cancel
                      </Button>
                    </Link>
                    <Button className='mb-1' color='primary' type='submit'>
                      Save Changes
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default ChangePassword
