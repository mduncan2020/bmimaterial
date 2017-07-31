import React, { PropTypes } from 'react'
import Toggle from 'material-ui/Toggle'

export const BinaryToggle = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Toggle
    label={label}
    {...input}
    {...custom}
  />
)

BinaryToggle.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
}

export default BinaryToggle
