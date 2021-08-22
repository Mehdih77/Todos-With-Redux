import { createSlice } from "@reduxjs/toolkit";
import { StatusFilters } from "../Filters/filterSlice";
import { createSelector } from "reselect";
import {client} from '../../api/client';


const initialState = {
    status: 'idle',
    entities: {}
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state,action) {
            const todo = action.payload;
            state.entities[todo.id] = todo
        },
        todoToggled(state,action) {
            const toggledTodoId = action.payload;
            state.entities[toggledTodoId].completed = !state.entities[toggledTodoId].completed
        },
        todoDeleted(state,action) {
            const deletedTodoId = action.payload; 
            delete state.entities[deletedTodoId]
        },
        markAllCompleted(state,action) {
            Object.values(state.entities).forEach(todo => {
                state.entities[todo.id].completed = true
            })
        },
        clearCompleted(state,action) {
            Object.values(state.entities).forEach(todo => {
                if (todo.completed) {
                    delete state.entities[todo.id]
                }
            })
        },
        colorChanged: {
            reducer(state,action) {
                const {color, id} = action.payload;
                state.entities[id].color = color;
            },
            prepare(todoId,color) {
                return {
                    payload: {
                        id: todoId,
                        color 
                    }
                }
            }
        },
        todosLoadingStarted(state,action){
            state.status = 'loading'
        },
        todosLoadingFailes(state,action) {
            state.status = "failes"    
        },
        todosLoadedSuccess(state,action){
            const todos = action.payload;
            const newEntities = {}
            todos.forEach(todo => {
                newEntities[todo.id] = todo
            })
            state.entities = newEntities;
            state.status = 'idle';
        }
    }
})

export const {
    todoAdded,
    todoToggled,
    todoDeleted,
    markAllCompleted,
    clearCompleted,
    colorChanged
} = todosSlice.actions;

export default todosSlice.reducer;


//* action factory 
const todosLoadingStarted = () => ({
    type: "todos/todosLoadingStarted"
})

const todosLoadedSuccess = (todos) => ({
    type: "todos/todosLoadedSuccess",
    payload: todos
})

const todosLoadingFailes = () => ({
    type: "todos/todosLoadingFailes"
})


//* thunk function
export const saveNewTodo = (text) => {
    return async function saveNewTodoThunk(dispatch) {
        const initTodo = {
            text,
            completed: false
        }
        const todoResult = await client.post('http://localhost:5000/todos',
         initTodo);
        dispatch(todoAdded(todoResult));
    }
}

//! handle state loading
export const fetchTodos = (dispatch, getState) => {
    dispatch(todosLoadingStarted())

    client.get('http://localhost:5000/todos').then( todos => {
        dispatch(todosLoadedSuccess(todos))
    }).catch( error => dispatch(todosLoadingFailes()) )
}


//* for useSelector
export const selectTodosIds = state => Object.keys(state.todosSlice.entities);

export const selectTodoEntities = state => state.todosSlice.entities;


//* fot filltering todo items
export const selectTodos = createSelector(
    selectTodoEntities,
    (todoEntities) => Object.values(todoEntities)
)

const selectFilteredTodos = createSelector(
    selectTodos,
    state => state.filterReducer,
    ( todos, filters ) => {
        const { status , colors } = filters;

        const showAll = status === StatusFilters.All;

        if ( showAll && colors.length === 0) {
            return todos
        }

        const showCompleted = status === StatusFilters.Completed;
        return todos.filter( todo => {
            const statusFilter = showAll || todo.completed === showCompleted;
            const colorsFilter = colors.length === 0 || colors.includes(todo.color);

            return statusFilter && colorsFilter;
    })
    }

)

export const selectFilteredTodoIds = createSelector(
    selectFilteredTodos,
    filteredTodos => filteredTodos.map(todo => todo.id)
)