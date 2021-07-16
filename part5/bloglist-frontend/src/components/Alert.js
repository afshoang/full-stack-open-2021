import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ alert }) => {
  return (
    alert !== null && <div className={`alert ${alert.type}`}>{alert.msg}</div>
  )
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
}

export default Alert
