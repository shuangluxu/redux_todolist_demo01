/**
 * 入口文件
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

/**
 * Redux 提供的 createStore 方法会根据 reducer生成 store，
 * 可以利用 store.dispatch 方法来达到修改状态的目的。
 */
let store = createStore(todoApp);

render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)