import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Config from '../../../config'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const style = {
  align: 'left',
  margin: '0.5px',
  color: 'red',
  position: 'relative'
}

const Register = () => {
  let history = useHistory();
  const baseUri = Config.API_BASE_URI;
  const [error, setError] = useState('');
  const [emailerror, setEmailError] = useState('');


  useEffect(() => {
    if (cookies.get('data')) {
      history.push('/dashboard');
    }
  }, [])

  const submit = (e) => {
    let username = e.target[0].value;
    let email = e.target[1].value;
    postCustomer(username, email);
  }

  const postCustomer = (username, email) => {
    let data = {
      username: username,
      email: email,
    }
    axios.post(baseUri + 'register', data,
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      }).then(response => {
        if (response.data.authStatus === 1) {
          setError(response.data.msg);
          setEmailError("");
        }
        else if (response.data.authStatus === 2) {
          setEmailError(response.data.msg);
          setError("");
        }
        else if (response.data.authStatus === 3) {
          setError(response.data.msg);
          setEmailError("");
        }
        else if (response.data.authStatus === 4) {
          setError(response.data.msg);
          setEmailError("");
        }
        else {
          window.location.href = "/";
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={
                  (e) => {
                    submit(e);
                    e.preventDefault();
                  }} >
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="username" placeholder="Username" autoComplete="username" required />
                  </CInputGroup>
                  <CInputGroup className="mb-1">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="email" placeholder="abc@email.com" autoComplete="email" required />
                  </CInputGroup>
                  {emailerror ? <h6 className="mb-3" style={style}>{emailerror}</h6> : ""}
                  {error ? <h6 className="mb-3" style={style}>{error}</h6> : ""}
                  <CButton className="mt-3 submit"
                    type="submit" color="success" block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CRow>
                  <CCol xs="12" sm="5">
                    <h6 className="text-muted">Already have an account?</h6>
                    <CButton component="a" color="secondary" href="/" role="button" block> Login!! </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
