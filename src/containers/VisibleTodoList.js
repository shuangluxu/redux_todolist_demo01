/**
 * 容器组件
 * containers/VisibleTodoList.js
 */
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

/**
 * 获取满足指定过滤条件的任务列表
 * @param {Array} todos 任务列表数组
 * @param {string} filter 列表显示内容过滤条件
 */
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_COMPLETED':
            /**
             * 调用数组的 filter() 过滤方法
             */
            return todos.filter(t => t.completed);

        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)

        case 'SHOW_ALL':
        
        default:
            return todos
    }
}

/**
 * 将获取任务列表的方法放入redux的状态树中
 * @param {Object} state
 * mapStateToProps(state, ownProps)
 * 这个函数用于建立组件跟 store 中 state 的映射关系。
 * 作为一个函数，它可以传入两个参数，结果一定要返回一个 object
 * 
 * 2.传入mapStateToProps之后，会订阅store的状态改变，
 *   每次 store 的 state发生变化的时候，都会被调用。
 * 
 * 3.ownProps代表组件本身的props, 如果写了第二个参数(ownProps)，
 *   那么当prop发生变化的时候，mapStateToProps也会被调用
 */
const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

/**
 * connect() 是个高阶函数，传入配置和要连接的组件，
 * 返回一个新组件，所有传入新组件的 prop ，
 * 包括 children，都将被传递给被连接的组件。
 */
const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)//会将 mapStateToProps 和 mapDispatchToProps 中返回的变量通过 props 传到容器 TodoList 中

export default VisibleTodoList