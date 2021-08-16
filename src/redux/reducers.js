import { combineReducers } from "redux";
import todosReducer from "../components/Todos/todosSlice";
import filterReducer from "../components/Filters/filterSlice";

const rootReducers = combineReducers({
    todosReducer,
    filterReducer
});

export default rootReducers;