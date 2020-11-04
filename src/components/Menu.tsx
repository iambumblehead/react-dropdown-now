import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import { Option } from './Option';
import { OptionGroup } from './OptionGroup';
import { RenderItem } from '../types';
import {
  DEFAULT_OPTIONS_EMPTY_STRING,
  BASE_DEFAULT_PROPS,
  ITEM_TYPE,
} from '../constants';

export interface MenuProps {
  selected: RenderItem;
  noOptionsDisplay: React.ReactNode;
  baseClassName: string;
  stateClassNames: Record<string, boolean>;
  options: RenderItem[];
  onSelect: (event: React.SyntheticEvent, option: RenderItem) => void;
}

export const Menu: React.FC<MenuProps> = ({
  selected,
  baseClassName,
  stateClassNames,
  options,
  onSelect,
  noOptionsDisplay = DEFAULT_OPTIONS_EMPTY_STRING,
}) => {
  if (options.length === 0) {
    return (
      <div
        className={classNames({
          [`${baseClassName}-menu-noresults`]: true,
          ...stateClassNames,
        })}
      >
        {noOptionsDisplay}
      </div>
    );
  }

  return (
    <>
      {options.map((item, i) => {
        if (Array.isArray(item)) {
          return (
            <OptionGroup
              key={get(item, '[0].label', i)}
              option={item}
              baseClassName={`${baseClassName}-menu`}
              selected={selected}
              onSelect={onSelect}
            />
          );
        }

        if (item.type === ITEM_TYPE.OPTION) {
          const isSelected = get(selected, 'id') === item.id;
          return (
            <Option
              key={item.id}
              option={item}
              selected={isSelected}
              onSelect={onSelect}
              tabIndex={item.index}
              baseClassName={`${baseClassName}-menu`}
              className={classNames({
                [item.option.className]: !!item.option.className,
              })}
            />
          );
        }

        return null;
      })}
    </>
  );
};

Menu.defaultProps = {
  ...BASE_DEFAULT_PROPS,
};
