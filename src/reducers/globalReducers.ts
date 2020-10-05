import { Action, ActionTypes } from '../actions/types';

const initialState = {
  user: {},
  categoria: {},
  categorias: [],
  articulo: {},
  articulos: [],
  isLogin: false,
};

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.SAVE_CATEGORIES: {
      return {
        ...state,
        categoria: action.payload,
      };
    }
    case ActionTypes.GET_CATEGORIES: {
      return {
        ...state,
        categorias: action.payload,
      };
    }

    case ActionTypes.DELETE_CATEGORIES: {
      return {
        ...state,
        categorias: action.payload,
      };
    }
    case ActionTypes.UPDATE_CATEGORIES: {
      return {
        ...state,
        categorias: action.payload,
      };
    }

    case ActionTypes.SAVE_ARTICLES: {
      return {
        ...state,
        articulo: action.payload,
      };
    }

    case ActionTypes.GET_ARTICLES: {
      return {
        ...state,
        articulos: action.payload,
      };
    }

    case ActionTypes.DELETE_ARTICLES: {
      return {
        ...state,
        articulos: action.payload,
      };
    }

    case ActionTypes.IS_LOGGIN: {
      return {
        ...state,
        isLogin: action.payload,
      };
    }

    default:
      return state;
  }
}
