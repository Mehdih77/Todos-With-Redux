import { useSelector, shallowEqual } from "react-redux";
import { selectTodos, selectTodosIds } from "../Todos/todosSlice";
import TodoListItems from "./TodoListItems";

export default function TodoList() {

    // const todos = useSelector(selectTodos);
    
    // use shallowEqual for block rendering all the components when small thing changed
    const todosIds = useSelector(selectTodosIds, shallowEqual) 

    // const renderedListItems = todos.map((todo) => {
    //     return <TodoListItems key={todo.id} todo={todo} />
    // })

    const renderedListItems = todosIds.map((id) => {
        return <TodoListItems key={id} id={id} />
    })

    return (
        <ul className='todo-list'>
            {renderedListItems}   
        </ul>
    )
}
