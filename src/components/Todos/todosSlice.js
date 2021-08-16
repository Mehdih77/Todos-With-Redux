// That comment codes is first way with array method
// then we changed them to another way with Object

const initState = {
    // entities: [
    //     { id: 1, text: "react", completed: true, color: "blue"},
    //     { id: 2, text: "redux", completed: false},
    //     { id: 3, text: "next.js", completed: true, color: "black"},
    //     { id: 4, text: "php", completed: false},
    //     { id: 5, text: "html", completed: true, color: "red"},
    // ]
    entities: {
        1: { id: 1, text: "react", completed: true, color: "blue"},
        2: { id: 2, text: "redux", completed: false},
        3: { id: 3, text: "next.js", completed: true, color: "black"},
        4: { id: 4, text: "php", completed: false},
        5: { id: 5, text: "html", completed: true, color: "red"},
    }
}

export default function todosReducer(state = initState, action){
    switch (action.type) {

        case 'todos/todoAdded':
            const todo = action.payload;
            // return {
            //     ...state,
            //     entities: [
            //         ...state.entities,
            //         todo
            //     ]
            // }
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [todo.id]: todo
                }
            }

        case "todos/todoToggled":
            const toggledTodoId = action.payload;
            // return {
            //     ...state,
            //     entities: state.entities.map(todo => {
            //         if (todo.id === toggledTodoId) {
            //             return {
            //                 ...todo,
            //                 completed: !todo.completed
            //             }
            //         }
            //         return todo;
            //     })
            // }
            const todoToggleddd = state.entities[toggledTodoId];
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [toggledTodoId]: {
                        ...todoToggleddd,
                        completed: !todoToggleddd.completed
                    }
                }
            }
            
        case "todos/todoDeleted":
            const deletedTodoId = action.payload;
            // return {
            //     ...state,
            //     entities: state.entities.filter(f => f.id !== deletedTodoId)
            // }   
            const entities = {...state.entities};
            delete entities[deletedTodoId];
            return {
                ...state,
                entities
            } 
    
        default:
            return state;
    }
}


// action factory
export const todoAdded = (text) => ({
    type: 'todos/todoAdded',
    payload: { id: 6, text, completed: false}
})

export const todoToggled = (todoId) => ({
    type: 'todos/todoToggled',
    payload: todoId
})

export const todoDeleted = (todoId) => ({
    type: 'todos/todoDeleted',
    payload: todoId
})

// for useSelector
export const selectTodos = state => state.todosReducer.entities;