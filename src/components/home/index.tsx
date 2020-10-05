import React from 'react';
import './index.scss';
import './carousel.scss';
import { Container, Row, Col } from 'react-bootstrap';
/* import { useSelector } from 'react-redux'; */

/* const logo = require('../../assets/images/logo.jpg'); */
const image = require('../../assets/images/logoPrincipal.jpeg');
//const imageFooter = require('../../assets/images/logoFooter.png');
const Home = () => {
  /* let articulos = useSelector((state) => state.global.articulos); */
  return (
    <>
      <Container>
        <Row className="cont-logo">
          <Col xs={12} md={8} className="mx-auto text-center">
            <h4 className="subtitle">Compraventa</h4>
            <h1 className="title">Confiar JGE</h1>
            <p className="subtitle__description">
              Confianza y Honestidad a su servicio
            </p>
          </Col>
        </Row>

        <Row className="cont__body">
          <Col xs={8} md={10}>
            <p className="description__home">
              Sabias que nuestra Compraventa Confiar Jge cuenta con camaras de
              seguridad? Te contamos que si y lo hacemos pensando en ustedes
              generando seguridad y tranquilidad, Manejamos servicio las 24
              horas. De Lunes a Sabado de 8:00am a 7:00pm, Domingos y festivos
              de 8:00am a 4:00pm con las persianas abiertas y por la cabina
              siempre con personal disponible las 24 horas, prestando el
              servicio y cuidando lo tuyo y lo nuestro! Recuerda nuestro
              principal guardían es DIOS Te esperamos!
            </p>
          </Col>
          <Col xs={6} md={2} lg={2}>
            <img src={`${image}`} alt="description" className="img__rounded" />
          </Col>
        </Row>
        <br />
        <br />

        <Row className="cont__body">
          <Col xs={8} md={6} sm={6}>
            <h2 className="title_v">Misión</h2>
            <p className="description__home">
              Nuestra misión es brindar una solución rápida y efectiva a la
              necesidad de dinero de los clientes, apoyándonos en el criterio y
              el conocimiento a la hora de avaluar los artículos, velando por
              establecer relaciones duraderas basadas en la confianza, el
              respeto y honestidad
            </p>
          </Col>
          <Col xs={8} md={6} sm={6}>
            <h2 className="title_v">Visión</h2>
            <p className="description__home">
              Para el 2023 Almacén y compraventa ConfiarJGE, Estara posicionada
              en el municipio de Itagui como la opción más viable para que los
              ciudadanos realicen sus contratos de compra-venta y
              comercialización de articulos
            </p>
          </Col>
        </Row>

        {/* //Ultimos articulos */}
      </Container>
    </>
  );
};

export default Home;
