import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { useHistory } from 'react-router-dom'
import Config from '../../../config'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const style = {
  align: 'left',
  margin: '0.5px',
  color: 'red',
  position: 'relative'
}

const Login = () => {
  const baseUri = Config.API_BASE_URI
  const [error, setError] = useState()
  const [emailerror, setEmailError] = useState()
  let history = useHistory();

  useEffect(() => {
    if (cookies.get('data')) {
      history.push('/dashboard');
    }
  }, [])

  const submit = e => {
    let email = e.target[0].value;
    let password = e.target[1].value;
    postCustomer(email, password);
  };

  const postCustomer = (email, password) => {
    let data = {
      email: email,
      password: password,
    };
    axios.post(baseUri + "login", data,
      {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => {
        if (response.data.authStatus === 0) {
          setEmailError("Email not verified!")
          setError("")
        }
        else if (response.data.authStatus === 1) {
          cookies.set('data', JSON.stringify(data), { path: '/' });
          cookies.set('token', "Bearer " + response.data.token, { path: '/' });
          cookies.set('data.email', JSON.stringify(data.email));
          window.location.href = "#/dashboard"
        }
        else if (response.data.authStatus === 2) {
          setError("Either email or password is not correct!")
          setEmailError("")
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={e => {
                    submit(e);
                    e.preventDefault();
                  }} >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-1">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" name="email" placeholder="Email" autoComplete="email" required />
                    </CInputGroup>
                    {emailerror ? <h6 className="mb-3" style={style}>{emailerror}</h6> : ""}
                    <CInputGroup className="mt-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" name="password" placeholder="Password" autoComplete="current-password" required />
                    </CInputGroup>
                    {error ? <h6 className="mt-1" style={style}>{error}</h6> : ""}
                    <CRow>
                      <CCol className="mb-2" xs="6">
                        <CButton className="mt-3 px-4" type="submit" role="button" ype="submit" color="primary" >Login</CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol className="mb-2">
                        {/* <p className="text-muted">Forgot Password? */}
                        <p className="text-muted"><a href="#/forgetPassword">Forgot Password?</a></p>
                        {/* </p> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p className="mt-5">Don't have an account?</p>
                    <Link to="/register">
                      <button style={{ backgroundColor: '#F9B200', color: 'black', padding: '10px', borderRadius: '10px', border: 'transparent' }}>Register Now</button>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
