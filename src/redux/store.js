import { applyMiddleware, createStore } from "redux";
import rootReducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

// for Using redux-devtools-extension + thunk
const composeEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducers, composeEnhancers);

export default store;