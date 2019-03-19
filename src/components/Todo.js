/**
 * 展示组件
 * components/Todo.js
 */
import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, completed, text }) => (
    <li 
        onClick={onClick} 
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}

export default Todo