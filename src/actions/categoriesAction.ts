import { ActionTypes, Action } from './types';
import { Dispatch } from 'redux';
import * as Constants from '../utils/constants';

const SAVE_CATEGORIES: any = (items: any): Action => ({
  type: ActionTypes.SAVE_CATEGORIES,
  payload: items,
});

const GET_CATEGORIES: any = (items: any): Action => ({
  type: ActionTypes.GET_CATEGORIES,
  payload: items,
});

const DELETE_CATEGORIES: any = (items: any): Action => ({
  type: ActionTypes.DELETE_CATEGORIES,
  payload: items,
});

const UPDATE_CATEGORIES: any = (items: any): Action => ({
  type: ActionTypes.UPDATE_CATEGORIES,
  payload: items,
});

export async function updateCategoryById(id, titulo, descripcion) {
  return async (dispatch: Dispatch) => {
    try {
      let data = JSON.parse(localStorage.getItem('usuario'));
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${data.token}`);

      let body = JSON.stringify({ titulo, descripcion });

      let requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body,
        redirect: 'follow',
      };

      let update = await fetch(
        `${Constants.URL_SERVICES}/api/updateCategorias/${id}`,
        requestOptions
      );
      let response = await update.json();
      dispatch(UPDATE_CATEGORIES(response));
    } catch (error) {}
  };
}

export async function deleteCategoriasById(id) {
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
        `${Constants.URL_SERVICES}/api/deleteCategorias/${id}`,
        requestOptions
      );
      let response = await dataDelete.json();
      dispatch(DELETE_CATEGORIES(response));
    } catch (error) {}
  };
}

export async function getCategorias() {
  return async (dispatch: Dispatch) => {
    try {
      let requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow',
      };

      let response = await fetch(
        `${Constants.URL_SERVICES}/api/categorias`,
        requestOptions
      );
      let categorias = await response.json();
      dispatch(GET_CATEGORIES(categorias));
    } catch (error) {
      console.log(error);
    }
  };
}

export async function saveCategories(titulo, descripcion, callback) {
  return async (dispatch: Dispatch) => {
    try {
      let data = JSON.parse(localStorage.getItem('usuario'));
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${data.token}`);

      let body = JSON.stringify({ titulo, descripcion });
      let requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body,
        redirect: 'follow',
      };

      let response = await fetch(
        `${Constants.URL_SERVICES}/api/saveCategorias`,
        requestOptions
      );
      let categoria = await response.json();
      callback(categoria);
      dispatch(SAVE_CATEGORIES(categoria));
    } catch (error) {
      console.log(error);
    }
  };
}
