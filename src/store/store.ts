import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const middleware = [thunkMiddleware];
//const loggerMiddleware: any = createLogger();

export default function configureStore(): any {
  // do not use loggerMiddleware in production

  // const listSateStore: Store<ListState> = createStore<ListState>(
  /* const confiarJge: Store<any> = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware, loggerMiddleware))
  ); */

  const confiarJge: Store<any> = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return confiarJge;
}
