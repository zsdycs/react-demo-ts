import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers
} from 'redux';
import { initLoginState, loginReducer } from './Login';

const middleware = applyMiddleware();

const composeEnhancers = compose;
const enhancer = composeEnhancers(
  middleware,
  // other store enhancers if any
);


const initState = {
  Login: initLoginState,
};


const reducers = {
  Login: loginReducer,
};


const store = createStore(combineReducers(reducers), initState, enhancer);

export default store;