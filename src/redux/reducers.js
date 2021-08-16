import { combineReducers } from "redux";
import todosReducer from "../components/Todos/todosSlice";

const rootReducers = combineReducers({
    todosReducer,
});

export default rootReducers;