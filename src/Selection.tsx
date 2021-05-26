import React, { useState } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import { Menu } from './components/Menu';
import { prepareOptions, findSelected, defaultMatcher } from './helpers';
import { BASE_DEFAULT_PROPS } from './constants';
import { SelectionProps, RenderItem } from './types';

export const Selection: React.FC<SelectionProps> = ({
  options: originalOptions,
  onSelect,
  matcher,
  value,
  disabled,
  onChange,
  baseClassName,
  className,
  noOptionsDisplay,
  menu: MenuContainer,
}) => {
  const options = prepareOptions(originalOptions);
  const [selected, setSelected] = useState(() =>
    findSelected(options, value, matcher),
  );

  const fireChangeEvent = (newSelectedState: RenderItem, e = null) => {
    if (onSelect) {
      onSelect(newSelectedState.option, e);
    }
    if (newSelectedState.id !== get(selected, 'id') && onChange) {
      onChange(newSelectedState.option, e);
    }
  };

  const setValue = (newValue: RenderItem, e = null) => {
    if (disabled) {
      return null;
    }
    setSelected(newValue);
    return fireChangeEvent(newValue, e);
  };

  const menuClass = classNames(`${baseClassName}-selection`, {
    [className]: !!className,
    'is-disabled': disabled,
    'is-empty': !options.length,
  });

  return (
    <MenuContainer className={menuClass}>
      <Menu
        selected={selected}
        options={options}
        stateClassNames={{ [className]: !!className }}
        baseClassName={`${baseClassName}-selection`}
        noOptionsDisplay={noOptionsDisplay}
        onSelect={(e, selectedValue) => setValue(selectedValue, e)}
      />
    </MenuContainer>
  );
};

Selection.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  onChange: () => undefined,
  matcher: defaultMatcher,
  menu: 'div',
};
