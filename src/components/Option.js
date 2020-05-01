import React from 'react';
import classNames from 'classnames';

import { getOptionLabel } from '../helpers';
import { BASE_DEFAULT_PROPS } from '../constants';

const Option = ({
  option: item,
  selected,
  onSelect,
  className,
  baseClassName,
  tabIndex,
}) => {
  const label = getOptionLabel(item.option);
  const optionClassName = classNames(className, `${baseClassName}-option`, {
    'is-selected': selected,
  });
  const handleSelect = (e) => onSelect(e, item);

  return (
    <div
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
