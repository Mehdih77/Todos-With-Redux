import { useDispatch } from "react-redux";
import { todoDeleted, todoToggled } from "./todosSlice";

export const availableColors = ["green", "blue", "orange", "purple", "red"];
export const captalize = (s) => s[0].toUpperCase() + s.slice(1); // to captalize first letter

export default function TodoListItems({todo}) {

  const { text, color, completed} = todo;
  const dispatch = useDispatch();

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {captalize(c)}
    </option>
  ))

  function handleCompletedChange() {
    dispatch(todoToggled(todo.id))
  }

  function handleDeleteTodo() {
    dispatch(todoDeleted(todo.id))
  }



    return (
        <li>
          <div className="view">
            <div className="segment label">
              <input 
                type="checkbox"
                className='toggle'
                checked={completed}
                onClick={handleCompletedChange}
              />
              <div className="todo-text">{text}</div>
            </div>
            <div className="degment button">
              <select 
                className='colorPicker'
                defaultValue={color}
                style={{color}}
                >
                  <option value=""></option>
                  {colorOptions}
              </select>
              <button className='destroy'
              onClick={handleDeleteTodo}>
                    <i className="fas fa-times"></i>
              </button>
            </div>
          </div>  
        </li>
    )
}
