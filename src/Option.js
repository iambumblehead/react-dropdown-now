import React from 'react';
import classNames from 'classnames';
import { getOptionLabel, getOptionValue } from './helpers';

const Option = props => {
  const { option, selected, onSelect, className } = props;
  const value = getOptionValue(option);
  const label = getOptionLabel(option);
  const isSelected = value === selected;
  const optionClassName = classNames('Dropdown-option', className, {
    'is-selected': isSelected
  });

  return (
    <div
      className={optionClassName.trim()}
      onMouseDown={e => onSelect(e, value, label)}
      onClick={e => onSelect(e, value, label)}
      role="option"
      aria-selected={String(isSelected)}>
      {label}
    </div>
  );
};

export default Option;
