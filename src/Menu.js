import React from 'react';
import classNames from 'classnames';

import Option from './Option';
import { getOptionValue } from './helpers';
import { BASE_DEFAULT_PROPS } from './constants';

const Menu = ({
  selected,
  baseClassName,
  options,
  onSelect,
  noOptionsDisplay,
  className
}) => {
  let tabIndex = -1;

  if (options.length === 0) {
    return (
      <div className={`${baseClassName}-noresults`}>
        {noOptionsDisplay}
      </div>
    );
  }

  const renderOption = option => {
    tabIndex += 1;
    return (
      <Option
        option={option}
        key={getOptionValue(option)}
        selected={selected}
        onSelect={onSelect}
        baseClassName={baseClassName}
        tabIndex={tabIndex}
        className={classNames({
          [`${baseClassName}-option`]: true,
          [option.className]: !!option.className,
        })}
      />
    );
  };

  return options.map(option => {
    if (option.type === 'group') {
      const groupTitle = (
        <div className={`${baseClassName}-title`}>{option.name}</div>
      );
      const tmpOptions = option.items.map(item => renderOption(item));

      return (
        <div
          className={`${baseClassName}-group`}
          key={option.name}
          role="listbox"
          tabIndex="-1"
        >
          {groupTitle}
          {tmpOptions}
        </div>
      );
    }

    return renderOption(option);
  });
};

Menu.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  noOptionsDisplay: 'No options found'
};

export default Menu;
