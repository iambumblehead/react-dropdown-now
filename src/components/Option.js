import React from 'react';
import classNames from 'classnames';

import { getOptionLabel, getOptionValue } from '../helpers';
import { BASE_DEFAULT_PROPS } from '../constants';

function isOptionSelected(currentValue, selection) {
  if (!selection) {
    return false;
  }
  return currentValue === getOptionValue(selection);
}

const Option = ({
  option,
  selected,
  onSelect,
  className,
  baseClassName,
  tabIndex,
}) => {
  const value = getOptionValue(option);
  const label = getOptionLabel(option);
  const isSelected = isOptionSelected(value, selected);
  const optionClassName = classNames(className, {
    [`${baseClassName}-option`]: true,
    'is-selected': isSelected,
  });
  const handleSelect = e => onSelect(e, value, label);

  return (
    <div
      className={optionClassName.trim()}
      onKeyDown={handleSelect}
      onMouseDown={handleSelect}
      onClick={handleSelect}
      role="option"
      aria-selected={String(isSelected)}
      tabIndex={tabIndex}
    >
      {label}
    </div>
  );
};

Option.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  tabIndex: -1,
};

export default Option;
