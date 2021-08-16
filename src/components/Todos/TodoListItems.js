import React from 'react'

export default function TodoListItems({todo}) {
    return (
        <li>
          {todo.text}  
        </li>
    )
}
