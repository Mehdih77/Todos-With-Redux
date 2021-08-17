import { useDispatch } from 'react-redux';
import { markAllCompleted, clearCompleted} from '../Todos/todosSlice';

export default function Actions() {

    const dispatch = useDispatch();

    const onMarkAllCompletedClick = () => dispatch(markAllCompleted());

    const onClearCompletedClick = () => dispatch(clearCompleted());

    return (
            <div className="actions">
                <h5>Actions</h5>
                <button onClick={onMarkAllCompletedClick} className='button'>Mark All Completed</button>
                <button onClick={onClearCompletedClick} className='button'>Clear Completed</button>
            </div>
    )
}
