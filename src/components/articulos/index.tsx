/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils/utils';
import ReactPaginate from 'react-paginate';
import * as Constants from '../../utils/constants';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Alert } from 'react-bootstrap';
import './index.scss';
import { Link } from 'react-router-dom';

const Articles = () => {
  const [articulos, setArticulos] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [categorySelected, setcategorySelected] = useState('');
  const [categoryName, setCategoryName] = useState(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(null);
  const [initialPage, setInitialPage] = useState(0);
  let categorias = useSelector((state) => state.global.categorias);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getArticles = async () => {
    try {
      setLoading(true);
      let requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
      };

      let response = await fetch(
        `${Constants.URL_SERVICES}/api/articulos?init=${0}&end=${6}`,
        requestOptions
      );

      let articulosJson = await response.json();
      if (articulosJson && articulosJson.ok) {
        setArticulos(articulosJson.articulos);
        let pageCount_init = Math.ceil(articulosJson.count / 6);
        setPageCount(pageCount_init);
      } else {
        setArticulos([]);
      }
      setLoading(false);
    } catch (error) {
      setArticulos([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function art() {
      await getArticles();
    }

    if (!articulos) {
      art();
    }
  }, [articulos, getArticles]);

  const clearSearch = async () => {
    await getArticles();
    setCategoryName(null);
    setcategorySelected('');
    setInitialPage(0);
  };

  const handlePrevAndNextButton = (selected) => {
    let page = selected + 1;
    if (page === pageCount) {
      (document.querySelector('.page-link.next') as any).style.display = 'none';
    } else {
      (document.querySelector('.page-link.next') as any).style.display =
        'block';
    }
  };

  const handlePageClick = async ({ selected }) => {
    try {
      setLoading(true);
      handlePrevAndNextButton(selected);
      let initPage = selected * 6;
      let requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
      };

      let response = await fetch(
        `${
        Constants.URL_SERVICES
        }/api/filterArticles?init=${initPage}&end=${6}&property=${filter}&value=${categorySelected}`,
        requestOptions
      );
      let articulosJson = await response.json();

      let pageCount_paginate = Math.ceil(articulosJson.count / 6);
      setPageCount(pageCount_paginate);
      setArticulos(articulosJson.articulos);
      setLoading(false);
    } catch (error) {
      setArticulos(null);
      setLoading(false);
    }
  };

  const filterArticles = async (categoria) => {
    try {
      setcategorySelected(categoria._id);
      setCategoryName(categoria.titulo);
      setLoading(true);
      setInitialPage(0);
      let requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
      };
      let response = await fetch(
        `${
        Constants.URL_SERVICES
        }/api/filterArticles?init=${0}&end=${6}&property=categoria&value=${
        categoria._id
        }`,
        requestOptions
      );
      setFilter('categoria');
      let articulosJson = await response.json();

      let pageCounts = Math.ceil(articulosJson.count / 6);
      setPageCount(pageCounts);
      setLoading(false);
      setArticulos(articulosJson.articulos);
    } catch (error) {
      setArticulos(null);
      setLoading(false);
    }
  };

  const Loaders = () => {
    return (
      <>
        <SkeletonTheme color="#a6aba3" highlightColor="#76bc42">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="product-item">
                <div className="pi-pic">
                  <Skeleton width={`100%`} height={200} />
                </div>

                <div className="pi-text">
                  <div className="catagory-name">
                    <Skeleton />
                  </div>
                  <a href="#">
                    <h5>
                      <Skeleton />
                    </h5>
                  </a>
                  <div className="product-price">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="product-item">
                <div className="pi-pic">
                  <Skeleton width={`100%`} height={200} />
                </div>

                <div className="pi-text">
                  <div className="catagory-name">
                    <Skeleton />
                  </div>
                  <a href="#">
                    <h5>
                      <Skeleton />
                    </h5>
                  </a>
                  <div className="product-price">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="product-item">
                <div className="pi-pic">
                  <Skeleton width={`100%`} height={200} />
                </div>

                <div className="pi-text">
                  <div className="catagory-name">
                    <Skeleton />
                  </div>
                  <a href="#">
                    <h5>
                      <Skeleton />
                    </h5>
                  </a>
                  <div className="product-price">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="product-item">
                <div className="pi-pic">
                  <Skeleton width={`100%`} height={200} />
                </div>

                <div className="pi-text">
                  <div className="catagory-name">
                    <Skeleton />
                  </div>
                  <a href="#">
                    <h5>
                      <Skeleton />
                    </h5>
                  </a>
                  <div className="product-price">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="product-item">
                <div className="pi-pic">
                  <Skeleton width={`100%`} height={200} />
                </div>

                <div className="pi-text">
                  <div className="catagory-name">
                    <Skeleton />
                  </div>
                  <a href="#">
                    <h5>
                      <Skeleton />
                    </h5>
                  </a>
                  <div className="product-price">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="product-item">
                <div className="pi-pic">
                  <Skeleton width={`100%`} height={200} />
                </div>

                <div className="pi-text">
                  <div className="catagory-name">
                    <Skeleton />
                  </div>
                  <a href="#">
                    <h5>
                      <Skeleton />
                    </h5>
                  </a>
                  <div className="product-price">
                    <Skeleton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      </>
    );
  };

  return (
    <Fragment>
      <section className="product-shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
              {categorias && categorias.length ? (
                <div className="filter-widget">
                  <h4 className="fw-title">Categorias</h4>
                  <ul className="filter-catagories">
                    {categorias.map((categoria, index) => (
                      <li
                        id={`category-${categoria._id}`}
                        key={index}
                        className={
                          categoria._id === categorySelected ? 'active' : ''
                        }
                      >
                        <a
                          onClick={() => filterArticles(categoria)}
                          key={categoria._id}
                          className={
                            categoria._id === categorySelected ? 'active' : ''
                          }
                        >
                          {categoria.titulo}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="col-lg-9 order-1 order-lg-2">
              <div className="product-list">
                {categoryName ? (
                  <Alert
                    variant={'success'}
                    onClose={() => clearSearch()}
                    dismissible
                  >
                    {categoryName}
                  </Alert>
                ) : null}

                {loading ? (
                  <Loaders />
                ) : articulos && articulos.length ? (
                  <div className="row">
                    {articulos.map((articulo, index) => (
                      <div className="col-lg-4 col-sm-6" key={index}>
                        <div className="product-item" key={index}>
                          <div className="pi-pic">
                            <img
                              src={articulo.imgFrontal}
                              alt={`img-${articulo._id}`}
                            />
                            <div className="sale pp-sale">Disponible</div>
                            <div className="icon">
                              <i className="icon_heart_alt"></i>
                            </div>
                            <ul>
                              <li className="w-icon active">
                                <Link to={`/detalle/${articulo._id}`}>
                                  <i className="icon_bag_alt"></i>
                                </Link>
                              </li>
                              <li className="quick-view">
                                <Link to={`/detalle/${articulo._id}`}>
                                  + Ver Más
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div className="pi-text">
                            <div className="catagory-name">
                              {articulo.categoria.titulo}
                            </div>
                            <Link to={`/detalle/${articulo._id}`}>
                              <h5>{articulo.titulo}</h5>
                            </Link>
                            <div className="product-price">
                              {formatPrice(articulo.precio)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                      <h1>No se encontraron resultados</h1>
                    )}
              </div>
              <div className="loading-more">
                {articulos && articulos.length ? (
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    forceSelected={initialPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'page-item active'}
                    previousClassName={'page-link'}
                    nextClassName={'page-link next'}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Articles;
