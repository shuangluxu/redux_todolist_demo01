## Redux学习笔记

## mapStateToProps(state, ownProps)

##### 用于建立组件跟  store 中 state 的映射关系。

作为一个函数，它可以传入两个参数，结果一定要返回一个 object。

传入 mapStateToProps 之后，会订阅 store 的状态改变，每次 store 的 state发生变化的时候，都会被调用。

[^1]: 这个订阅指的是什么？

ownProps 代表组件本身的 props，如果写了第二个参数 ownProps，那么当 props 发生变化的时候，mapStateToProps 也会被调用。

例如，当 props 接收到来自父组件一个小改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算。 

####  mapStateToProps一般定义在哪里？

**mapStateToProps 方法就是容器组件向 store 声明需要的 state 的地方。**

因为， store 在整个应用只有一份，根据 redux 的思想通过 context 可以保证每一个组件都可以从 context 中获取到 store，不需要一级一级的从顶层传递下来。

所以，一般**容器组件上会有这个函数**负责通过 context 获取到 store 中想要的 state，即从 store 中获取到的state 相当于容器组件从父组件拿到的 props。

> ***因此，mapStateToProps 函数一般只存在于容器组件（或顶层组件）中。***

**props 可以不传，如果不传，组件不会监听 store 的变化，也就是说 Store 的更新不会引起UI的更新。**

```javascript
/* 没有传入props参数 */
const mapStateToProps = (state) => {
    return {
        /* 从 store 中获取到的 state，相当于容器组件从父组件拿到的 props */
        todoList: state.todoList
    }
}
```

```javascript
/* 传入了 props */
const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter
    }
}
```

### mapDispatchToProps

##### 建立组件跟`store.dispatch`的映射关系，可以是一个 object ，也可以传入函数 。

> ```javascript
> import React, { Component } from 'react';
> import { connect } from 'redux';
> import action from './actions';
> 
> action.increase = function(info) {
>     return {
>         {
>             type: 'INCREASE',
>             info
>     	}
>     }
> }
> 
> action.decrease = function(info) {
>     return {
>         {
>         	type: 'DECREASE',
>         	info
>     	}
>     }
> }
> 
> /**
>  * dispatch：store上下文中获取的属性方法
>  * ownProps：代表组件本身的 props
>  */
> const mapDispatchToProps = (dispatch, ownProps) => {
>     return {
>         /*
>          * 调用 actions.increase() 只能得到一个 action对象 {type:'INCREASE'} ，
>          * 要触发这个 action 必须在 store 上调用 dispatch 方法。 
>          * diapatch 正是 mapDispatchToProps 的第一个参数。
>          * 但是，为了不让组件感知到 dispatch 的存在，
>          * 我们需要将 increase 和 decrease 两个函数包装一下，
>          * 使之成为直接可被调用的函数（即，调用该方法就会触发 dispatch)。
>          */
>         increase: (...args) => dispatch(action.increase(...args)),
>         decrease: (...args) => dispatch(action.decrease(...args))
>     }
> }
> 
> const App = connect(
> 	mapStateToProps,
>     mapDispatchToProps
> )(Counter)//会将 mapStateToProps 和 mapDispatchToProps 中返回的变量通过 props 传到容器 Counter 中
> 
> 
> // 定义组件
> class Counter extends Component {
>     render() {
>         const { value, onIncreaseClick } = this.props;
>         return (
>         	<div>
>             	<span>{value}</span>
>             	<button onClick={onIncreaseClick}>increase</button>
>             </div>
>         )
>     }
> }
> 
> // Reducer:是一个纯函数
> function counter(state = { count: 0 }, action) {
>     
>     const count = stae.count;
>     
>     switch (action.type) {
>         case 'INCREASE':
>             return { count: count + 1 }
>             
>         case 'DECREASE':
>             return { count: count - 1 }
>             
>         default:
>             return state
>     }
> }
> ```



### redux 与 react交互流程

1. 用户界面接受到一个请求：会 dispathc 一个 action

2. action 调用相应的 reducer

3. reducer 返回一个新的 state ，这时 store 的状态就会刷新

4. 如果使用 connect 链接了容器组件：connect()  会监听 store 的变化

5. 一旦 store 有变化：就会执行 mapStateToProps 函数

6. mapStateToProps 返回一组新的 props，这时相当于 props 变化了

7. props变化了：会走到容器组件的 componentWillMount() 函数进行更新，

   如果 componentWillMount 中调用了 setState() 方法，就会重新 render.

   即使 componentWillMount 中没有调用 setState() 也会再次 render 进行重绘。



### 参考:

[深入 Redux 之 createStore]: https://www.jianshu.com/p/85e4757814cd
[React-Redux流程中，mapStateToProps的理解]: https://blog.csdn.net/weixin_38178584/article/details/82189351



#### connect() 方法

connect() 是个高阶函数，传入配置和要连接的组件，返回一个新组件，所有传入新组件的 prop ，包括 children，都将被传递给被连接的组件。

```javascript
//伪代码
function connect (mapStateToProps, mapDispatchToProps) {
    return function (Component) {
        return function (props) {
            console.log(props.children)
            return 
            <Component 
                {...props} 
                {...mapStateToProps} 
                {...mapDispatchToProps}
            />
        }
    }
}
```



 