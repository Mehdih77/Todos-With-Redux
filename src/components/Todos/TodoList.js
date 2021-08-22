import {useSelector, shallowEqual} from "react-redux";
import {selectFilteredTodoIds} from "../Todos/todosSlice";
import TodoListItems from "./TodoListItems";
import Loader from "../Loader/Loader";

export default function TodoList() {

    //  use shallowEqual for block rendering all the components when small thing changed
    const todosIds = useSelector(selectFilteredTodoIds, shallowEqual);
    const loading = useSelector(state => state.todosSlice.status);

    if (loading === 'loading') {
        return (
            <div className="todo-list">
                <Loader />
            </div>
        )
    }

    if (loading === 'failes') {
        return (
            <div className="todo-list">
                Error in loading Todos
            </div>
        )
    }

    const renderedListItems = todosIds.map((id) => {
        return <TodoListItems key={id} id={id}/>
    })

    return (
        <ul className='todo-list'>
            {renderedListItems}
        </ul>
    )
}
