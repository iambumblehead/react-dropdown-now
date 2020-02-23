import React from 'react';
import classNames from 'classnames';

import Option from './Option';
import OptionGroup from './OptionGroup';
import { getOptionValue, getOptionName } from './helpers';
import { BASE_DEFAULT_PROPS } from './constants';

const Menu = ({
  selected,
  baseClassName,
  options,
  onSelect,
  noOptionsDisplay,
  className
}) => {
  if (options.length === 0) {
    return (
      <div className={`${baseClassName}-noresults`}>
        {noOptionsDisplay}
      </div>
    );
  }
  
  return options.map(option => option.type === 'group' ? (
    <OptionGroup
      key={getOptionName(option)}
      option={option}
      selected={selected}
      className={className}
      onSelect={onSelect}
    />
  ) : (
    <Option
      key={getOptionValue(option)}
      option={option}
      selected={selected}
      onSelect={onSelect}
      className={classNames({
        [option.className]: !!option.className,
      })}      
    />
  ));
};

Menu.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  noOptionsDisplay: 'No options found'
};

export default Menu;
