import React from 'react';
import classNames from 'classnames';

import { getOptionDisplay } from '../helpers';
import { BASE_DEFAULT_PROPS } from '../constants';
import { RenderItem } from '../types';

export interface OptionProps {
  selected?: boolean;
  className?: string;
  baseClassName?: string;
  tabIndex?: number;
  option: RenderItem;
  onSelect?: (event: React.SyntheticEvent, option: RenderItem) => void;
}

export const Option: React.FC<OptionProps> = ({
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

  const handleSelect = (e: React.SyntheticEvent) => {
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
      aria-selected={selected}
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
