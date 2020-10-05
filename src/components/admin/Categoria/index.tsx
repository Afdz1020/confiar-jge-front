import React, { useState, Fragment } from 'react';
import ListCategories from './listCategories';
import { Col, Form, Alert } from 'react-bootstrap';
import {
  saveCategories,
  getCategorias
} from '../../../actions/categoriesAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../login/index.scss';

const FormCategoria = () => {
  const dispatch = useDispatch();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [validationTitulo, setValidationTitulo] = useState(false);
  const [validationDescripcion, setValidationDescripcion] = useState(false);
  const [message, setMessage] = useState(null);
  const [colorAlert, setColorAlert] = useState(null);

  const history = useHistory();

  const validateFields = () => {
    let response = true;

    if (!titulo) {
      response = false;
      setValidationTitulo(true);
    }

    if (!descripcion) {
      response = false;
      setValidationDescripcion(true);
    }

    return response;
  };

  const proccessInfo = async categoria => {
    if (!categoria.ok && categoria.err.message === 'Token no valido') {
      setMessage('Su sesión ha expirado autentiquese nuevamente');
      setColorAlert('warning');
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }

    if (!categoria.ok && categoria.err.errors) {
      setMessage(categoria.message);
      setColorAlert('danger');
    } else {
      setMessage('Categoria Creada correctamente');
      setColorAlert('success');
      setDescripcion(null);
      setTitulo(null);
      setTimeout(async () => {
        dispatch(await getCategorias());
      }, 500);
    }
  };

  const saveCategorias = async e => {
    e.preventDefault();
    try {
      if (validateFields()) {
        dispatch(await saveCategories(titulo, descripcion, proccessInfo));
      }
    } catch (error) {
      setMessage('Hubo un error intentelo mas tarde');
      setColorAlert('danger');
    }
  };

  const handleTitulo = ({ target }) => {
    setTitulo(target.value);
    setValidationTitulo(false);
  };

  const handleDescripcion = ({ target }) => {
    setDescripcion(target.value);
    setValidationDescripcion(false);
  };
  return (
    <Fragment>
      <Col md={5} xs={12}>
        <h5>Agregar Categoría</h5>
        <Form onSubmit={e => saveCategorias(e)}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              className={
                validationTitulo ? 'form-control validation' : 'form-control'
              }
              placeholder=""
              onChange={handleTitulo}
              value={titulo}
            />
            {validationTitulo ? (
              <div className="alert-red">Debe diligenciar el Título</div>
            ) : null}
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input
              type="text"
              className={
                validationDescripcion
                  ? 'form-control validation'
                  : 'form-control'
              }
              placeholder=""
              onChange={handleDescripcion}
              value={descripcion}
            />

            {validationDescripcion ? (
              <div className="alert-red">Debe diligenciar la descripción</div>
            ) : null}
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-login"
              value="Registrar Categoria"
            />
          </div>
          {message ? (
            <Alert
              variant={colorAlert}
              onClose={() => setMessage(null)}
              dismissible
            >
              {message}
            </Alert>
          ) : null}
          <br />
        </Form>
      </Col>

      <Col md={5} xs={12}>
        <ListCategories />
        <br />
      </Col>
    </Fragment>
  );
};

export default FormCategoria;
