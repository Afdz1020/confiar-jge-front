import { ActionTypes, Action } from './types';
import { Dispatch } from 'redux';

const IS_LOGGIN: any = (item: any): Action => ({
  type: ActionTypes.IS_LOGGIN,
  payload: item,
});

export function isLoggin() {
  return (dispatch: Dispatch) => {
    let user = JSON.parse(localStorage.getItem('usuario'));
    if (user && Object.keys(user).length) {
      dispatch(IS_LOGGIN(true));
    } else {
      dispatch(IS_LOGGIN(false));
    }
  };
}
