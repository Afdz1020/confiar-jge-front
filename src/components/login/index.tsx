import React, { Fragment, useState } from 'react';
import { Form, Row, Col, Container, Carousel, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { validateEmail } from '../../utils/utils';
import { isLoggin } from '../../actions/globalActions';
import { useDispatch } from 'react-redux';
import * as Constants from '../../utils/constants';
import './index.scss';
const image = require('../../assets/images/image.jpg');
const image2 = require('../../assets/images/image2.jpg');
const image3 = require('../../assets/images/image3.jpg');

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [validationEmail, setvalidationEmail] = useState(false);
  const [validationEmailText, setvalidationEmailText] = useState('');
  const [validationPassword, setvalidationPassword] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const validateFields = () => {
    let response = true;

    if (!validateEmail(email)) {
      response = false;
      setvalidationEmail(true);
      setvalidationEmailText('Debe ingresar un email valido');
    }

    if (!password) {
      response = false;
      setvalidationPassword(true);
    }

    return response;
  };
  const loginUser = async (e) => {
    setLoginError(false);
    e.preventDefault();
    try {
      if (validateFields()) {
        setLoading(true);
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let data = JSON.stringify({
          email,
          password,
        });

        let requestOptions: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: data,
          redirect: 'follow',
        };

        let user = await fetch(
          `${Constants.URL_SERVICES}/api/login`,
          requestOptions
        );

        let response = await user.json();
        if (
          !response.ok &&
          response.err.messsage === 'Usuario o contraseña incorrectos'
        ) {
          setLoading(false);
          setLoginError(true);
        } else {
          localStorage.setItem('usuario', JSON.stringify(response));
          dispatch(isLoggin());
          history.push('/administrador');
        }
      }
    } catch (error) {
      setLoading(false);
      setLoginError(true);
      console.log({ error });
      console.log('Hubo un error intentelo mas tarde');
    }
  };

  const handleEmail = ({ target }) => {
    setvalidationEmail(false);
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setvalidationPassword(false);
    setPassword(target.value);
  };

  const Loading = () => {
    return <Spinner animation="grow" />;
  };
  return (
    <Fragment>
      <section className="login-block">
        <Container>
          <Row>
            <Col md={4} className="login-sec">
              <h2 className="text-center">Ingresar</h2>
              <Form className="login-form" onSubmit={(e) => loginUser(e)}>
                <div className="form-group">
                  <label className="text-uppercase">Correo</label>
                  <input
                    type="text"
                    className={
                      validationEmail
                        ? 'form-control validation'
                        : 'form-control'
                    }
                    placeholder=""
                    onChange={handleEmail}
                  />
                  {validationEmail ? (
                    <div className="alert-red">{validationEmailText}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label className="text-uppercase">Contraseña</label>
                  <input
                    type="password"
                    className={
                      validationPassword
                        ? 'form-control validation'
                        : 'form-control'
                    }
                    placeholder=""
                    onChange={handlePassword}
                  />

                  {validationPassword ? (
                    <div className="alert-red">Debe ingresar la contraseña</div>
                  ) : null}
                </div>

                <div className="form-check">
                  {loading ? (
                    <Loading />
                  ) : (
                      <button type="submit" className="btn btn-login float-right">
                        Ingresar
                      </button>
                    )}
                </div>

                {loginError ? (
                  <div className="form-check">
                    <p>Usuario o contraseña invalidos</p>
                  </div>
                ) : null}
              </Form>
            </Col>
            <div className="col-md-8 banner-sec">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block img-fluid"
                    src={`${image}`}
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block img-fluid"
                    src={`${image3}`}
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block img-fluid"
                    src={`${image2}`}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default Login;
