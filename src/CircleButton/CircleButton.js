import React from 'react';
import PropTypes from 'prop-types';
import './CircleButton.css';

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props;

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps,
    },
    props.children
  );
}

NavCircleButton.defaultProps = {
  tag: 'a',
};

NavCircleButton.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
  ]),
  otherProps: PropTypes.shape({
    optionalProperty: PropTypes.string,
  }),
};
