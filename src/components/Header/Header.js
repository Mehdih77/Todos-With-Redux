import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { saveNewTodo } from '../Todos/todosSlice';

export default function Header() {

    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleChanges = (e) => setText(e.target.value);
    const handleKeyDown = (e) => {
        const trimmedText = text.trim();  // for block sending blank text
        if (e.which === 13 && trimmedText) {
            dispatch(saveNewTodo(trimmedText))

            setText('');
        }
    }

    return (
        <header className='header'>
            <input 
                type="text"
                className='new-todo'
                placeholder='What needs to be done?'
                value={text}
                onChange={handleChanges}
                onKeyDown={handleKeyDown}
            />
        </header>
    )
}
