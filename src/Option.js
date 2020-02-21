import React from 'react';
import classNames from 'classnames';

import { getOptionLabel, getOptionValue } from './helpers';
import { BASE_DEFAULT_PROPS } from './constants';

const Option = props => {
  const { option, selected, onSelect, className, baseClassName } = props;
  const value = getOptionValue(option);
  const label = getOptionLabel(option);
  const isSelected = value === selected;
  const optionClassName = classNames(className, {
    [`${baseClassName}-option`]: true,
    'is-selected': isSelected
  });

  return (
    <div
      className={optionClassName.trim()}
      onMouseDown={e => onSelect(e, value, label)}
      onClick={e => onSelect(e, value, label)}
      role="option"
      aria-selected={String(isSelected)}
    >
      {label}
    </div>
  );
};

Option.defaultProps = {
  ...BASE_DEFAULT_PROPS
};

export default Option;
