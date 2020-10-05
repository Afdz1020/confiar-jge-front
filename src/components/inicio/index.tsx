import React, { Fragment, useEffect } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Header from '../header';
import Home from '../home';
import Login from '../login';
import Admin from '../admin';
import Articles from '../articulos';
import Detalle from '../detalle';
import Contactenos from '../contactenos';
import Logout from '../login/logout';
import { useDispatch } from 'react-redux';
import { getArticles } from '../../actions/ArticulosAction';
import { getCategorias } from '../../actions/categoriesAction';
import { isLoggin } from '../../actions/globalActions';
import { Col } from 'react-bootstrap';
import './index.scss';

const imageFooter = require('../../assets/images/logoFooter.png');
const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggin());
    async function articulos() {
      dispatch(await getArticles());
    }

    async function categorias() {
      dispatch(await getCategorias());
    }

    categorias();

    articulos();
  }, [dispatch]);
  return (
    <Fragment>
      <HashRouter basename="/">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/articulos" render={() => <Articles />} />
          <Route exact path="/contactenos" render={() => <Contactenos />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/detalle/:id" render={() => <Detalle />} />
          <Route exact path="/administrador" render={() => <Admin />} />
          <Route exact path="/logout" render={() => <Logout />} />
        </Switch>
      </HashRouter>

      <footer id="sticky-footer">
        <div className="container">
          <div className="row">
            <Col xs={8} md={6} sm={6}>
              <div className="footer-left">
                <ul>
                  <li>Dirección: Carrera 52# 51a - 05: Itagui</li>
                  <li>Telefono: +57 314628439</li>
                </ul>
                <div className="footer-social">
                  <a
                    href="https://www.facebook.com/compraventa.confiarjge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-facebook" />
                  </a>
                  <a
                    href="https://www.instagram.com/confiarjge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-instagram" />
                  </a>
                </div>
              </div>
            </Col>

            <Col xs={8} md={6} sm={6}>
              <img
                src={`${imageFooter}`}
                alt="footer"
                className="img__footer"
              />
            </Col>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Main;
