/**
 * 展示组件
 * components/Link.js
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * children 参数哪来的？
 * 是React自带的表示当前组件的所有子元素
 */
const Link = ({ active, children, onClick }) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <a 
            href="" 
            onClick={e => {
                e.preventDefault()
                onClick()
            }
        }>
            {children}
        </a>
    )
}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Link