export enum ActionTypes {
  GET_USER,
  SAVE_CATEGORIES,
  GET_CATEGORIES,
  DELETE_CATEGORIES,
  UPDATE_CATEGORIES,
  SAVE_ARTICLES,
  GET_ARTICLES,
  DELETE_ARTICLES,
  IS_LOGGIN,
}

export type Action =
  | { type: ActionTypes.GET_USER; payload: any }
  | { type: ActionTypes.SAVE_CATEGORIES; payload: any }
  | { type: ActionTypes.GET_CATEGORIES; payload: any }
  | { type: ActionTypes.DELETE_CATEGORIES; payload: any }
  | { type: ActionTypes.UPDATE_CATEGORIES; payload: any }
  | { type: ActionTypes.SAVE_ARTICLES; payload: any }
  | { type: ActionTypes.GET_ARTICLES; payload: any }
  | { type: ActionTypes.DELETE_ARTICLES; payload: any }
  | { type: ActionTypes.IS_LOGGIN; payload: any };
