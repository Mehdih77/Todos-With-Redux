import { createStore } from "redux";
import rootReducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

// for Using redux-devtools-extension
const composeEnhancers = composeWithDevTools();

const store = createStore(rootReducers, composeEnhancers);

export default store;