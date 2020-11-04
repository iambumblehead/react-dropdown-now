import React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import { Option } from './Option';
import { BASE_DEFAULT_PROPS, ITEM_TYPE } from '../constants';
import { RenderItem } from '../types';

export interface OptionGroupProps {
  selected: RenderItem;
  className?: string;
  baseClassName: string;
  option: RenderItem[];
  onSelect: (event: React.SyntheticEvent, option: RenderItem) => void;
}

export const OptionGroup: React.FC<OptionGroupProps> = ({
  option,
  selected,
  onSelect,
  className,
  baseClassName,
}) => {
  return (
    <div
      className={classNames(`${baseClassName}-group`, className)}
      role="listbox"
      tabIndex={-1}
    >
      {option.map((item) => {
        if (item.type === ITEM_TYPE.LABEL && item.label) {
          return (
            <div key={item.label} className={`${baseClassName}-group-title`}>
              {item.label}
            </div>
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
              baseClassName={`${baseClassName}-group`}
              className={classNames({
                [item.option.className]: !!item.option.className,
              })}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

OptionGroup.defaultProps = {
  ...BASE_DEFAULT_PROPS,
};
