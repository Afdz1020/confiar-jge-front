import React, { Fragment, useState } from 'react';
import { Col, Form, Row, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { saveArticles, getArticles } from '../../../actions/ArticulosAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ListArticles from './listArticles';
import '../../login/index.scss';
const FormArticulos = () => {
  const dispatch = useDispatch();
  const [fields, SetFields] = useState({
    titulo: '',
    precio: '',
    descripcion: '',
    categoria: '',
    imagenIzquierda: null,
    imagenDerecha: null,
    imagenFrontal: null,
    imagenOpcional: null,
    imagenOpcional1: null,
  });
  const [validations, SetValidations] = useState({
    titulo: false,
    descripcion: false,
    precio: false,
    categoria: false,
    imagenFrontal: false,
  });
  const [message, setMessage] = useState(null);
  const [colorAlert, setColorAlert] = useState(null);
  const history = useHistory();

  let categorias = useSelector((state) => state.global.categorias);

  const validateFields = () => {
    let response = true;

    if (!fields.titulo) {
      response = false;
      SetValidations((validations) => ({
        ...validations,
        titulo: true,
      }));
    }

    if (!fields.descripcion) {
      response = false;
      SetValidations((validations) => ({
        ...validations,
        descripcion: true,
      }));
    }
    if (!fields.precio) {
      response = false;
      SetValidations((validations) => ({
        ...validations,
        precio: true,
      }));
    }

    if (!fields.categoria) {
      response = false;
      SetValidations((validations) => ({
        ...validations,
        categoria: true,
      }));
    }

    if (!fields.imagenFrontal) {
      response = false;
      SetValidations((validations) => ({
        ...validations,
        imagenFrontal: true,
      }));
    }

    return response;
  };

  const proccessInfo = async (articulo) => {
    if (!articulo.ok && articulo.err.message === 'Token no valido') {
      setMessage('Su sesión ha expirado autentiquese nuevamente');
      setColorAlert('warning');
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }

    if (!articulo.ok && articulo.err.errors) {
      setMessage(articulo.message);
      setColorAlert('danger');
    } else {
      setMessage('Articulo Creado correctamente');
      setColorAlert('success');
      let i = {
        titulo: '',
        precio: '',
        descripcion: '',
        categoria: '',
        imagenIzquierda: null,
        imagenDerecha: null,
        imagenFrontal: null,
        imagenOpcional: null,
        imagenOpcional1: null,
      };

      SetFields({ ...i });

      setTimeout(async () => {
        dispatch(await getArticles());
      }, 500);
    }
  };

  const saveArticulos = async (e) => {
    e.preventDefault();
    try {
      if (validateFields()) {
        let info = { ...fields, proccessInfo };
        dispatch(await saveArticles(info));
      }
    } catch (error) {
      setMessage('Hubo un error intentelo mas tarde');
      setColorAlert('danger');
    }
  };

  const handleInput = ({ target: { name, value } }) => {
    if (name === 'precio') {
      value = parseInt(value);
    }
    SetFields((fields) => ({ ...fields, [name]: value }));
    SetValidations((validations) => ({
      ...validations,
      [name]: false,
    }));
  };

  const handleImage = ({ target: { name, files, value } }) => {
    SetFields((fields) => ({
      ...fields,
      [name]: { file: files[0], path: value },
    }));
    SetValidations((validations) => ({
      ...validations,
      [name]: false,
    }));
  };

  return (
    <Fragment>
      <h5>Agregar Articulo</h5>
      <Form encType="multipart/form-data" onSubmit={(e) => saveArticulos(e)}>
        <Row>
          <Col md={4}>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                className={
                  validations.titulo
                    ? 'form-control validation'
                    : 'form-control'
                }
                placeholder=""
                onChange={handleInput}
                value={fields.titulo}
                name="titulo"
              />
              {validations.titulo ? (
                <div className="alert-red">Debe diligenciar el Título</div>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Precio</label>
              <input
                type="number"
                className={
                  validations.precio
                    ? 'form-control validation'
                    : 'form-control'
                }
                placeholder=""
                onChange={handleInput}
                value={fields.precio}
                name="precio"
              />

              {validations.precio ? (
                <div className="alert-red">
                  Debe diligenciar el precio del articulo
                </div>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Categoría</label>
              {categorias && categorias.length ? (
                <select
                  id="selectCategorias"
                  name="categoria"
                  value={fields.categoria}
                  className={
                    validations.categoria
                      ? 'form-control validation'
                      : 'form-control'
                  }
                  onChange={handleInput}
                >
                  {/* <option>Seleccióne una opción</option> */}
                  <option value="" disabled selected>
                    Seleccióne una opción
                  </option>
                  {categorias.map((categoria) => (
                    <option key={categoria._id} value={categoria._id}>
                      {categoria.titulo}
                    </option>
                  ))}
                </select>
              ) : null}

              {validations.categoria ? (
                <div className="alert-red">Debe seleccionar la categoria</div>
              ) : null}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="form-group">
              <label>Imagen Izquierda</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
                name="imagenIzquierda"
                value={
                  fields.imagenIzquierda ? fields.imagenIzquierda.path : ''
                }
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Imagen Frontal</label>
              <input
                type="file"
                className={
                  validations.imagenFrontal
                    ? 'form-control validation'
                    : 'form-control'
                }
                accept="image/*"
                onChange={handleImage}
                name="imagenFrontal"
                value={fields.imagenFrontal ? fields.imagenFrontal.path : ''}
              />

              {validations.imagenFrontal ? (
                <div className="alert-red">
                  Debe seleccionar la imagen Frontal
                </div>
              ) : null}
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Imagen Derecha</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
                name="imagenDerecha"
                value={fields.imagenDerecha ? fields.imagenDerecha.path : ''}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Imagen Opcional</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
                name="imagenOpcional"
                value={fields.imagenOpcional ? fields.imagenOpcional.path : ''}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="form-group">
              <label>Imagen Opcional</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
                name="imagenOpcional1"
                value={
                  fields.imagenOpcional1 ? fields.imagenOpcional1.path : ''
                }
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <div className="form-group">
              <label>Descripción</label>
              <textarea
                className={
                  validations.descripcion
                    ? 'form-control validation'
                    : 'form-control'
                }
                placeholder=""
                onChange={handleInput}
                value={fields.descripcion}
                name="descripcion"
              />
              {validations.descripcion ? (
                <div className="alert-red">Debe diligenciar la descripción</div>
              ) : null}
            </div>
          </Col>

          <Col md={4}>
            <div className="form-group">
              <input
                type="submit"
                className="btn btn-login"
                value="Registrar Articulos"
              />
            </div>
          </Col>
        </Row>
      </Form>
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

      <Col md={10} xs={12}>
        <ListArticles />
        <br />
      </Col>
    </Fragment>
  );
};

export default FormArticulos;
