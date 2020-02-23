import React, { useState } from 'react';
import classNames from 'classnames';

import Menu from './components/Menu';
import { parseOptionsValue } from './helpers';
import { BASE_DEFAULT_PROPS } from './constants';

function Selection({
  options,
  value,
  disabled,
  onChange,
  baseClassName,
  className,
  noOptionsDisplay,
}) {
  const [selected, setSelected] = useState(parseOptionsValue(options, value));

  const fireChangeEvent = newSelectedState => {
    if (newSelectedState !== selected && onChange) {
      onChange(newSelectedState);
    }
  };

  const setValue = (newValue, newLabel) => {
    if (disabled) {
      return null;
    }
    const newSelectedState = parseOptionsValue(options, newValue) || {
      value: newValue,
      label: newLabel,
    };
    fireChangeEvent(newSelectedState);
    return setSelected(newSelectedState);
  };

  const menuClass = classNames('Selection-menu', {
    [className]: !!className,
    [`${baseClassName}-menu`]: true,
    [`${baseClassName}-disabled`]: disabled,
  });

  return (
    <div className={menuClass}>
      <Menu
        selected={selected}
        options={options}
        baseClassName={baseClassName}
        noOptionsDisplay={noOptionsDisplay}
        onSelect={(e, selectedValue, label) => setValue(selectedValue, label)}
      />
    </div>
  );
}

Selection.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  onChange: () => {},
};

export default Selection;
