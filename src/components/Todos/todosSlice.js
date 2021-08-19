// That comment codes is first way with array method
// then we changed them to another way with Object
import produce from "immer";
import { StatusFilters } from "../Filters/filterSlice";
import { createSelector } from "reselect";
import {client} from '../../api/client';
// import axios from "axios";


const initState = {
    // entities: [
    //     { id: 1, text: "react", completed: true, color: "blue"},
    //     { id: 2, text: "redux", completed: false},
    //     { id: 3, text: "next.js", completed: true, color: "black"},
    //     { id: 4, text: "php", completed: false},
    //     { id: 5, text: "html", completed: true, color: "red"},
    // ]
    status: 'idle',
    entities: {}
}

const todosReducer = produce((state, action) => {
    switch (action.type) {

        case 'todos/todoAdded':
            const todo = action.payload;
            state.entities[todo.id] = todo
            break;

        case "todos/todoToggled":
            const toggledTodoId = action.payload;
            state.entities[toggledTodoId].completed = !state.entities[toggledTodoId].completed
            break;

        case "todos/todoDeleted":
            const deletedTodoId = action.payload; 
            delete state.entities[deletedTodoId]
            break;
        
        case "todos/markAllCompleted":
            Object.values(state.entities).forEach(todo => {
                state.entities[todo.id].completed = true
            })
            break;

        case "todos/clearCompleted":
            Object.values(state.entities).forEach(todo => {
                if (todo.completed) {
                    delete state.entities[todo.id]
                }
            })
            break;
        case "todos/colorChanged":
            const {color, id} = action.payload;
            state.entities[id].color = color;
            break;
        case 'todos/todosLoadingStarted':
            state.status = 'loading'
            break;
        case "todos/todosLoadingFailes":
            state.status = "failes"    
            break;
        case "todos/todosLoadedSuccess":
            const todos = action.payload;
            const newEntities = {}
            todos.forEach(todo => {
                newEntities[todo.id] = todo
            })
            state.entities = newEntities;
            state.status = 'idle';
    }
} , initState)

export default todosReducer;

// export default function todosReducer(state = initState, action){
//     switch (action.type) {

//         case 'todos/todoAdded':
//             const todo = action.payload;
//             // return {
//             //     ...state,
//             //     entities: [
//             //         ...state.entities,
//             //         todo
//             //     ]
//             // }
//             return {
//                 ...state,
//                 entities: {
//                     ...state.entities,
//                     [todo.id]: todo
//                 }
//             }

//         case "todos/todoToggled":
//             const toggledTodoId = action.payload;
//             // return {
//             //     ...state,
//             //     entities: state.entities.map(todo => {
//             //         if (todo.id === toggledTodoId) {
//             //             return {
//             //                 ...todo,
//             //                 completed: !todo.completed
//             //             }
//             //         }
//             //         return todo;
//             //     })
//             // }
//             const todoToggleddd = state.entities[toggledTodoId];
//             return {
//                 ...state,
//                 entities: {
//                     ...state.entities,
//                     [toggledTodoId]: {
//                         ...todoToggleddd,
//                         completed: !todoToggleddd.completed
//                     }
//                 }
//             }
            
//         case "todos/todoDeleted":
//             const deletedTodoId = action.payload;
//             // return {
//             //     ...state,
//             //     entities: state.entities.filter(f => f.id !== deletedTodoId)
//             // }   
//             const entities = {...state.entities};
//             delete entities[deletedTodoId];
//             return {
//                 ...state,
//                 entities
//             } 
    
//         default:
//             return state;
//     }
// }


export const todoAdded = (todo) => ({
    type: 'todos/todoAdded',
    payload: todo
})
//* action factory 
export const todoToggled = (todoId) => ({
    type: 'todos/todoToggled',
    payload: todoId
})

export const todoDeleted = (todoId) => ({
    type: 'todos/todoDeleted',
    payload: todoId
})

export const markAllCompleted = () => ({
    type: 'todos/markAllCompleted'
})

export const clearCompleted = () => ({
    type: "todos/clearCompleted"
})

export const colorChanged = (todoId , color) => ({
    type: 'todos/colorChanged',
    payload: {
        id: todoId,
        color
    }
})

// status loading type

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
export const selectTodosIds = state => Object.keys(state.todosReducer.entities);

export const selectTodoEntities = state => state.todosReducer.entities;

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

// const selectFilteredTodos = state => {
//     const todos = Object.values(selectTodoEntities(state));
//     const { status , colors } = state.filterReducer;

//     const showAll = status === StatusFilters.All;

//     if ( showAll && colors.length === 0) {
//         return todos
//     }

//     const showCompleted = status === StatusFilters.Completed;
//     return todos.filter( todo => {
//         const statusFilter = showAll || todo.completed === showCompleted;
//         const colorsFilter = colors.length === 0 || colors.includes(todo.color);

//         return statusFilter && colorsFilter;
//     })
// }

export const selectFilteredTodoIds = createSelector(
    selectFilteredTodos,
    filteredTodos => filteredTodos.map(todo => todo.id)
)

// export const selectFilteredTodoIds = state => {
//     const filteredTodos = selectFilteredTodos(state);

//     return filteredTodos.map( todo => todo.id )
// }