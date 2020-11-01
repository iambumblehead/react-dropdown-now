import React from 'react';
import classNames from 'classnames';

import { getOptionDisplay } from '../helpers';
import { BASE_DEFAULT_PROPS } from '../constants';

const Option = ({
  option: item,
  selected,
  onSelect,
  className,
  baseClassName,
  tabIndex,
}) => {
  const label = getOptionDisplay(item.option);
  const isDisabled = item.option.disabled;
  const optionClassName = classNames(className, `${baseClassName}-option`, {
    'is-selected': selected,
    'is-disabled-option': !!isDisabled,
  });

  const handleSelect = (e) => {
    if (isDisabled) {
      e.stopPropagation();
      return e.preventDefault();
    }

    return onSelect(e, item);
  };

  return (
    <div
      data-testid="dropdown-option"
      className={optionClassName.trim()}
      onKeyDown={handleSelect}
      onMouseDown={handleSelect}
      onClick={handleSelect}
      role="option"
      aria-selected={String(selected)}
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
