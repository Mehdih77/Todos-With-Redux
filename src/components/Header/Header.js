import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { saveNewTodo } from '../Todos/todosSlice';

export default function Header() {

    const [text, setText] = useState('');
    // different with status in redux
    const [status, setStatus] = useState('idle')
    const dispatch = useDispatch();

    const handleChanges = (e) => setText(e.target.value);
    const handleKeyDown = async (e) => {
        const trimmedText = text.trim();  // for block sending blank text
        if (e.which === 13 && trimmedText) {
            setStatus('loading')
            await dispatch(saveNewTodo(trimmedText))
            console.log(saveNewTodo());
            setText('');
            setStatus('idle')
        }
    }

    const isLoading = status === 'loading';
    const placeHolder = isLoading ? '' : 'What needs to be done?' ;
    const loader = isLoading ? <div className='loader'></div> : null;

    return (
        <header className='header'>
            <input 
                type="text"
                className='new-todo'
                placeholder={placeHolder}
                value={text}
                onChange={handleChanges}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
            />
            {loader}
        </header>
    )
}
