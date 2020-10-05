import React, { useState, Fragment, useEffect, useCallback } from 'react';
import {
  Table,
  Button,
  ButtonGroup,
  Modal,
  Row,
  Col,
  Form,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  getCategorias,
  deleteCategoriasById,
  updateCategoryById,
} from '../../../actions/categoriesAction';
import { useDispatch } from 'react-redux';
const ListCategories = () => {
  const [modal, showModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [bodyModal, setModalBody] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDesctipcion] = useState('');
  const [idCategoria, setidCategoria] = useState('');
  const dispatch = useDispatch();

  let categorias = useSelector((state) => state.global.categorias);

  const deleteCategorias = async (id) => {
    dispatch(await deleteCategoriasById(id));
    setTimeout(async () => {
      dispatch(await getCategorias());
      showModal(false);
      setMessageModal('');
      setModalBody(null);
    }, 500);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const updateCategory = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(await updateCategoryById(idCategoria, titulo, descripcion));
      setTimeout(async () => {
        dispatch(await getCategorias());
        showModal(false);
        setMessageModal('');
        setModalBody(null);
        setTitulo('');
        setDesctipcion('');
        setidCategoria('');
      }, 500);
    },
    [dispatch, idCategoria, titulo, descripcion]
  );

  useEffect(() => {
    if (titulo !== '' && descripcion !== '') {
      setModalBody(
        <Modal.Body>
          <Row className="show-grid">
            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Título
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    defaultValue={titulo}
                    onChange={(e) => setTitulo(e.currentTarget.value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="3">
                  Descripción
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    defaultValue={descripcion}
                    onChange={(e) => setDesctipcion(e.currentTarget.value)}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Row>
          <Modal.Footer>
            <Button variant="danger" onClick={(e) => updateCategory(e)}>
              Si
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal.Body>
      );
    }
  }, [titulo, descripcion, updateCategory]);

  const openModal = async (categoria, type) => {
    await setTitulo(categoria.titulo);
    await setDesctipcion(categoria.descripcion);
    await setidCategoria(categoria._id);
    if (type === 'eliminar') {
      showModal(true);
      setMessageModal('Estas seguro que deseas eliminar');
      setModalBody(
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => deleteCategorias(categoria._id)}
          >
            Si
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      );
    }

    if (type === 'actualizar') {
      showModal(true);
      setMessageModal('Actualizar propiedades');
    }
  };

  const handleClose = () => showModal(false);

  return (
    <Fragment>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {categorias && categorias.length
            ? categorias.map((categoria) => (
                <tr key={categoria._id}>
                  <td>{categoria.titulo}</td>
                  <td>{categoria.descripcion}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example" size="sm">
                      <Button
                        variant="danger"
                        onClick={() => openModal(categoria, 'eliminar')}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => openModal(categoria, 'actualizar')}
                      >
                        Actualizar
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>

      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{messageModal}</Modal.Title>
        </Modal.Header>
        {bodyModal}
      </Modal>
    </Fragment>
  );
};

export default ListCategories;
