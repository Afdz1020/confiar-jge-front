import React, { useState, Fragment } from 'react';
import { Table, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {
  getArticles,
  deleteCategoriasById,
} from '../../../actions/ArticulosAction';
import { useDispatch } from 'react-redux';
const ListArticles = () => {
  const [modal, showModal] = useState(false);
  const [messageModal, setMessageModal] = useState('');
  const [bodyModal, setModalBody] = useState(null);
  const [, setTitulo] = useState('');
  const [, setDesctipcion] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [idArticulo, setidArticulo] = useState('');
  const dispatch = useDispatch();

  let articulos = useSelector((state: any) => state.global.articulos);

  const deleteArticles = async (id) => {
    dispatch(await deleteCategoriasById(id));
    setTimeout(async () => {
      dispatch(await getArticles());
      showModal(false);
      setMessageModal('');
      setModalBody(null);
    }, 500);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  /* const updateCategory = useCallback(
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
  ); */
  /* 
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
  }, [titulo, descripcion, updateCategory]); */
  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  };

  const openModal = async (articulo, type) => {
    await setTitulo(articulo.titulo);
    await setDesctipcion(articulo.descripcion);
    await setidArticulo(articulo._id);
    if (type === 'eliminar') {
      showModal(true);
      setMessageModal('Estas seguro que deseas eliminar');
      setModalBody(
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteArticles(articulo._id)}>
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
      {articulos && articulos.length ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Título</th>
              <th>Precio</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {articulos.map((articulo) => (
              <tr key={articulo._id}>
                <td>{articulo.titulo}</td>
                <td>{formatPrice(articulo.precio)}</td>
                <td>{articulo.categoria.titulo}</td>
                <td>
                  <ButtonGroup aria-label="Basic example" size="sm">
                    <Button
                      variant="danger"
                      onClick={() => openModal(articulo, 'eliminar')}
                    >
                      Eliminar
                    </Button>
                    {/* <Button
                      variant="warning"
                      onClick={() => openModal(articulo, 'actualizar')}
                    >
                      Actualizar
                    </Button> */}
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}

      <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{messageModal}</Modal.Title>
        </Modal.Header>
        {bodyModal}
      </Modal>
    </Fragment>
  );
};

export default ListArticles;
