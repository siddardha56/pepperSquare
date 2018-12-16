import React from 'react';
import PropTypes from 'prop-types';

import styles from './input.scss';

const Input = props => (
  <input
    {...props}
    className={`${props.type === 'button' && styles.inputButton} ${styles.input}`}
  />
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Input;
