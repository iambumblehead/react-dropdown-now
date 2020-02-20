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
  className,
  expanded
}) => {
  const renderOption = option => (
    <Option
      option={option}
      key={getOptionValue(option)}
      selected={selected}
      onSelect={onSelect}
      baseClassName={baseClassName}
      className={classNames({
        [`${baseClassName}-option`]: true,
        [option.className]: !!option.className
      })}
    />
  );

  let ops = options.map(option => {
    if (option.type === 'group') {
      let groupTitle = (
        <div className={`${baseClassName}-title`}>{option.name}</div>
      );
      let tmpoptions = option.items.map(item => renderOption(item));

      return (
        <div
          className={`${baseClassName}-group`}
          key={option.name}
          role="listbox"
          tabIndex="-1"
        >
          {groupTitle}
          {tmpoptions}
        </div>
      );
    }

    return renderOption(option);
  });

  const display = ops.length ? (
    ops
  ) : (
    <div className={`${baseClassName}-noresults`}>{noOptionsDisplay}</div>
  );

  return (
    <div className={className} aria-expanded={expanded.toString()}>
      {display}
    </div>
  );
};

Menu.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  noOptionsDisplay: 'No options found',
  expanded: false
};

export default Menu;
