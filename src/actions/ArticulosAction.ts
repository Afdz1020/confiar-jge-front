import { ActionTypes, Action } from './types';
import { Dispatch } from 'redux';
import axios, { AxiosRequestConfig } from 'axios';
import * as Constants from '../utils/constants';

const SAVE_ARTICLES: any = (items: any): Action => ({
  type: ActionTypes.SAVE_ARTICLES,
  payload: items,
});
const GET_ARTICLES: any = (items: any): Action => ({
  type: ActionTypes.GET_ARTICLES,
  payload: items,
});

const DELETE_ARTICLES: any = (item: any): Action => ({
  type: ActionTypes.DELETE_ARTICLES,
  payload: item,
});

export function deleteCategoriasById(id) {
  return async (dispatch: Dispatch) => {
    try {
      let data = JSON.parse(localStorage.getItem('usuario'));
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${data.token}`);

      let requestOptions: RequestInit = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow',
      };

      let dataDelete = await fetch(
        `${Constants.URL_SERVICES}/api/deleteArticulos/${id}`,
        requestOptions
      );
      let response = await dataDelete.json();
      dispatch(DELETE_ARTICLES(response));
    } catch (error) {}
  };
}

export async function getArticles() {
  return async (dispatch: Dispatch) => {
    let requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow',
    };

    let response = await fetch(
      `${Constants.URL_SERVICES}/api/articulos?init=${0}&end=${5000}`,
      requestOptions
    );
    let articulos = await response.json();
    dispatch(GET_ARTICLES(articulos.articulos));
  };
}

export async function saveArticles(info) {
  return async (dispatch: Dispatch) => {
    try {
      let {
        titulo,
        precio,
        descripcion,
        categoria,
        imagenIzquierda,
        imagenDerecha,
        imagenFrontal,
        imagenOpcional,
        imagenOpcional1,
        proccessInfo,
      } = info;
      let data = JSON.parse(localStorage.getItem('usuario'));
      let formdata = new FormData();
      formdata.append('titulo', titulo);
      formdata.append('precio', precio);
      formdata.append('descripcion', descripcion);
      formdata.append('categoria', categoria);
      if (imagenIzquierda) {
        formdata.append('imgIzquierda', imagenIzquierda.file);
      }
      if (imagenDerecha) {
        formdata.append('imgDerecha', imagenDerecha.file);
      }
      if (imagenFrontal) {
        formdata.append('imgFrontal', imagenFrontal.file);
      }
      if (imagenOpcional) {
        formdata.append('imgOpcional', imagenFrontal.file);
      }
      if (imagenOpcional1) {
        formdata.append('imgOpcional1', imagenFrontal.file);
      }

      let requestOptions: AxiosRequestConfig = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${data.token}`,
        },
      };
      let datos = await axios.post(
        `${Constants.URL_SERVICES}/api/saveArticulos`,
        formdata,
        requestOptions
      );

      let articulo = await datos.data;
      proccessInfo(articulo);
      dispatch(SAVE_ARTICLES(articulo));
    } catch (error) {
      console.log(error);
    }
  };
}
