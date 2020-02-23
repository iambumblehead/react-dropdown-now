import React from 'react';
import classNames from 'classnames';

import Option from './Option';
import { getOptionValue } from './helpers';
import { BASE_DEFAULT_PROPS } from './constants';

const OptionGroup = props => {
  const {
    option,
    selected,
    onSelect,
    className,
    baseClassName,
    startTabIndex,
  } = props;

  const groupTitle = (
    <div className={`${baseClassName}-title`}>{option.name}</div>
  );

  return (
    <div
      className={`${baseClassName}-group`}
      key={option.name}
      role="listbox"
      tabIndex="-1"
    >
      {groupTitle}
      {option.items.map(( item, i ) => (
        <Option
          option={item}
          key={getOptionValue(item)}
          selected={selected}
          onSelect={onSelect}
          baseClassName={baseClassName}
          tabIndex={startTabIndex + i}
          className={classNames({
            [item.className]: !!item.className,
          })}
        />
      ))}
    </div>
  );
};

OptionGroup.defaultProps = {
  ...BASE_DEFAULT_PROPS
};

export default OptionGroup;
