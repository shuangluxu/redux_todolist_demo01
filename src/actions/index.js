/**
 * actions/index.js
 * Action 是把数据从应用（这里之所以不叫 view 是因为这些数据有可能是服务器响应，
 * 用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。
 * 一般来说你会通过 store.dispatch() 将 action 传到 store。
 * 1.action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
 */
let nextTodoId = 0;

//添加新 todo 任务的 action
export const addTodo = text => {
    return {
        type: 'ADD_TODO',
        id: nextTodoId++,
        text
    }
}

//表示当前的任务展示选项
export const setVisibilityFilter = filter => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

//表示用户完成任务的动作
export const toggleTodo = id => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}