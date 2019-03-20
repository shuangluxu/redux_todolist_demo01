/**
 * 容器组件
 * containers/FilterLink.js
 */
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.setVisibilityFilter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
}

/**
 * connect() 是个高阶函数，传入配置和要连接的组件，
 * 返回一个新组件，所有传入新组件的 prop ，
 * 包括 children，都将被传递给被连接的组件
 */
const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)

export default FilterLink