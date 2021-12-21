import React from 'react'
import PropTypes from 'prop-types'


const Button = ({title, color, onClick}) => {
    return <button className='btn' style={{backgroundColor: color}} onClick= {onClick}>{title}</button>
}

Button.defaultProps ={
    title: 'add',
    color: 'steelblue'
}

Button.propTypes = {
    title: PropTypes.string
}

export default Button
