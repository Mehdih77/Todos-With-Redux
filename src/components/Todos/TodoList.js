import { useSelector } from "react-redux";
import { selectTodos } from "../Todos/todosSlice";
import TodoListItems from "./TodoListItems";

export default function TodoList() {

    const todos = useSelector(selectTodos);

    // const renderedListItems = todos.map((todo) => {
    //     return <TodoListItems key={todo.id} todo={todo} />
    // })

    const renderedListItems = Object.keys(todos).map((todoId) => {
        return <TodoListItems key={todoId} todo={todos[todoId]} />
    })

    return (
        <ul className='todo-list'>
            {renderedListItems}   
        </ul>
    )
}
