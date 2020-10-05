import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './index.scss';

const Header = () => {
  let isLogin = useSelector((state) => state.global.isLogin);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Link to="/" className="nav-link">
          Inicio
        </Link>
        <Link to="/Articulos" className="nav-link">
          Articulos
        </Link>

        {/* <Link to="/contactenos" className="nav-link">
          Contactenos
        </Link> */}
        {!isLogin ? (
          <Link to="/login" href="">
            <i className="fas fa-user"></i>
          </Link>
        ) : (
          <NavDropdown title="Usuario" id="basic-nav-dropdown">
            <Link to="/administrador" className="nav-link">
              Administrador
            </Link>
            <Link to="/logout" className="nav-link">
              Cerrar Sesión
            </Link>
          </NavDropdown>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
