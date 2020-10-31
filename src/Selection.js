import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import Menu from './components/Menu';
import { prepareOptions, findSelected, defaultMatcher } from './helpers';
import { BASE_DEFAULT_PROPS } from './constants';

function Selection({
  options: originalOptions,
  onSelect,
  matcher,
  value,
  disabled,
  onChange,
  baseClassName,
  className,
  noOptionsDisplay,
  menu: MenuContainer
}) {
  const options = useMemo(() => prepareOptions(originalOptions), [
    originalOptions,
  ]);
  const [selected, setSelected] = useState(
    findSelected(options, value, matcher),
  );

  const fireChangeEvent = (newSelectedState, e) => {
    if (onSelect) {
      onSelect(newSelectedState.option, e);
    }
    if (newSelectedState.id !== get(selected, 'id') && onChange) {
      onChange(newSelectedState.option, e);
    }
  };

  const setValue = (newValue, e) => {
    if (disabled) {
      return null;
    }
    setSelected(newValue);
    return fireChangeEvent(newValue, e);
  };

  const menuClass = classNames(`${baseClassName}-selection`, {
    [className]: !!className,
    'is-disabled': disabled,
    'is-empty': !options.length
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
}

Selection.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  onChange: () => undefined,
  matcher: defaultMatcher,
  menu: 'div'
};

export default Selection;
