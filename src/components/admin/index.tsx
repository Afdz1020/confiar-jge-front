import React, { Fragment, useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import FormCategoria from './Categoria';
import FormArticulos from './Articulos';
/* import { useDispatch } from 'react-redux'; */
const Admin = () => {
  const [activeTab, setactiveTab] = useState('1');
  let data = JSON.parse(localStorage.getItem('usuario'));
  /* const dispatch = useDispatch(); */

  const handleSelect = (selectedTab: string) => {
    setactiveTab(selectedTab);
  };

  return (
    <Fragment>
      <Container>
        <br />
        <h3>Bienvenido {data.usuario.nombre} </h3>

        <Tabs id="tabs-user" activeKey={activeTab} onSelect={handleSelect}>
          <Tab
            eventKey={'1'}
            title={
              <span>
                Categorias <i className="fas fa-coins"></i>
              </span>
            }
          >
            <br />
            <FormCategoria />
          </Tab>
          <Tab
            eventKey={'2'}
            title={
              <span>
                Articulos <i className="fas fa-cart-arrow-down"></i>
              </span>
            }
          >
            <br />
            <FormArticulos />
          </Tab>
          <Tab
            eventKey={'3'}
            title={
              <span>
                Usuarios <i className="fas fa-users" />{' '}
              </span>
            }
          >
            Tab 3 content
          </Tab>
        </Tabs>
      </Container>
    </Fragment>
  );
};

export default Admin;
