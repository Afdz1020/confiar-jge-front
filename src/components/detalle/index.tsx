import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { formatPrice } from '../../utils/utils';
import { FacebookShareButton, FacebookIcon, WhatsappIcon } from 'react-share';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import * as Constants from '../../utils/constants';

const Detalle = () => {
  const [detalle, setDetalle] = useState(null);
  const [photos, setFotos] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    async function art() {
      let images = [];
      let detalleobj = await getArticle();
      setDetalle(detalleobj);
      images.push({
        original: detalleobj.imgDerecha,
        thumbnail: detalleobj.imgDerecha,
        sizes: '(min-width: 400px) 400px, 100vw',
      });
      images.push({
        original: detalleobj.imgFrontal,
        thumbnail: detalleobj.imgFrontal,
      });
      images.push({
        original: detalleobj.imgIzquierda,
        thumbnail: detalleobj.imgIzquierda,
      });
      images.push({
        original: detalleobj.imgOpcional,
        thumbnail: detalleobj.imgOpcional,
      });
      images.push({
        original: detalleobj.imgOpcional1,
        thumbnail: detalleobj.imgOpcional1,
      });
      setFotos(images);
    }

    if (!detalle) {
      art();
    }
  });

  const getArticle = async () => {
    try {
      let requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
      };

      let response = await fetch(
        `${
          Constants.URL_SERVICES
        }/api/filterArticles?init=${0}&end=${8}&property=_id&value=${id}`,
        requestOptions
      );

      let articulosJson = await response.json();

      if (articulosJson && articulosJson.ok) {
        return articulosJson.articulos[0];
      }
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="container">
      <br />
      {detalle && detalle != null ? (
        <div className="row">
          <div className="col-lg-6">
            <ImageGallery
              showIndex={true}
              showPlayButton={false}
              items={photos}
            />
          </div>
          <div className="col-lg-6">
            <div className="row">
              {/* <div className="col-lg-6"></div> */}
              <div className="col-lg-12">
                <div className="product-details">
                  <div className="pd-title">
                    <span>{detalle.categoria.titulo}</span>
                    <h3>{detalle.titulo}</h3>
                  </div>

                  <div className="pd-desc">
                    <p>{detalle.descripcion}</p>
                    <h4>{formatPrice(detalle.precio)}</h4>
                  </div>

                  <div className="pd-size-choose">
                    <h5>Compartir</h5>
                    <div
                      className="sc-item"
                      onClick={() => {
                        let message = encodeURIComponent(
                          `¿ Hola sigue disponible ? ${window.location.href}/#/detalle/${detalle._id}`
                        );
                        window.open(
                          `https://api.whatsapp.com/send?phone=573146285439&text=${message}&source=&data=&app_absent=`,
                          '_blank'
                        );
                      }}
                    >
                      <input type="radio" id="sm-size" />
                      <label htmlFor="sm-size">
                        {/* <WhatsappShareButton
                          url={window.location.href}
                          className="Demo__some-network__share-button"
                        >
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton> */}
                        <WhatsappIcon size={32} round />
                      </label>
                    </div>
                    <div className="sc-item">
                      <input type="radio" id="md-size" />
                      <label htmlFor="md-size">
                        <FacebookShareButton
                          url={window.location.href}
                          quote={detalle.titulo + ` \n ${detalle.descripcion}`}
                        >
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Detalle;
