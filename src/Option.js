import React from 'react';
import { getOptionLabel, getOptionValue } from './helpers';

const Option = props => {
  const { option, selected, onSelect, className } = props;
  const value = getOptionValue(option);
  const label = getOptionLabel(option);
  const isSelected = value === selected;
  import classNames from 'classnames';
  const optionClassName = classNames('Dropdown-option', className, { 'is-selected': isSelected });

  optionClassName = `${optionClassName} ${isSelected ? 'is-selected' : ''}`;

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
