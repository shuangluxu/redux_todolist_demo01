/**
 * 容器组件
 * containers/AddTodo.js
 * Refs:
 * React支持一个可以附加到任何组件的特殊属性ref。
 * ref属性可以是一个字符串或一个回调函数。
 * 当ref属性是一个回调函数时，函数接收底层DOM元素或类实例（取决于元素的类型）作为参数。
 * 这使你可以直接访问DOM元素或组件实例。
 * 不要过度使用 Refs。如果你发现自己经常在应用程序中使用refs来“搞事情”，请考虑使用状态提升。
 */
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

//onSubmit抽出函数失败????
//为什么AddTodo组件要用let,而改为const之后，报：Error: "AddTodo" is read-only
let AddTodo = ({ dispatch }) => {
    let input;

    return (
        <div>
            <form 
                onSubmit={e => {
                    e.preventDefault()
                    if (!input.value.trim()) {
                        return
                    }

                    dispatch(addTodo(input.value))
                    input.value = ''
                }}
            >
                <input 
                    ref={node => {
                        input = node
                    }}
                />
                
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
}

/**
 * store 里能直接通过 store.dispatch() 调用 dispatch() 方法，
 * 但是多数情况下会使用 react-redux 提供的 connect() 帮助器来调用。
 */
AddTodo = connect()(AddTodo);

export default AddTodo