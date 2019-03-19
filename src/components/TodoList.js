/**
 * 展示组件
 * components/TodoList.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

//此处参数语法是解构赋值，还是传对象？
const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
        ))}
    </ul>
)

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired
}

export default TodoList