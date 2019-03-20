/**
 * 展示组件
 * components/TodoList.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

//此处使用上级容器中传递过来的 props 进行解构赋值，作为组件的入参
const TodoList = ({ todos, onTodoClick }) => (
    <ul>
        {
            /**
             * TodoList 用于显示 todos 列表:
             *      todos: Array 以 { text, completed } 形式显示的 todo 项数组。
             *      onTodoClick(index: number) 当 todo 项被点击时调用的回调函数。
             */
            todos.map(todo => (
                <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
            ))
        }
    </ul>
)
/**
 * 对Component设置propTypes属性，可以为 Component 的 props 属性进行类型检查.
 * PropTypes提供了许多验证工具，用来帮助你确定props数据的有效性.
 * 处于性能原因，类型检查仅在开发模式下进行。
 */
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