import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import Menu from './components/Menu';
import { prepareOptions, findSelected, defaultMatcher } from './helpers';
import { BASE_DEFAULT_PROPS } from './constants';

function Selection({
  options: originalOptions,
<<<<<<< HEAD
=======
  onSelect,
>>>>>>> develop
  matcher,
  value,
  disabled,
  onChange,
  baseClassName,
  className,
  noOptionsDisplay,
}) {
  const options = useMemo(() => prepareOptions(originalOptions), [
    originalOptions,
  ]);
  const [selected, setSelected] = useState(
    findSelected(options, value, matcher),
  );

  const fireChangeEvent = (newSelectedState, e) => {
<<<<<<< HEAD
=======
    if (onSelect) {
      onSelect(newSelectedState.option, e);
    }
>>>>>>> develop
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

<<<<<<< HEAD
  const menuClass = classNames('Selection-menu', {
    [className]: !!className,
    [`${baseClassName}-menu`]: true,
    [`${baseClassName}-disabled`]: disabled,
=======
  const menuClass = classNames(`${baseClassName}-selection`, {
    [className]: !!className,
    'is-disabled': disabled,
    'is-empty': !options.length
>>>>>>> develop
  });

  return (
    <div className={menuClass}>
      <Menu
        selected={selected}
        options={options}
<<<<<<< HEAD
        baseClassName={baseClassName}
=======
        stateClassNames={{ [className]: !!className }}
        baseClassName={`${baseClassName}-selection`}
>>>>>>> develop
        noOptionsDisplay={noOptionsDisplay}
        onSelect={(e, selectedValue) => setValue(selectedValue, e)}
      />
    </div>
  );
}

Selection.defaultProps = {
  ...BASE_DEFAULT_PROPS,
<<<<<<< HEAD
  onChange: () => {},
=======
  onChange: () => undefined,
>>>>>>> develop
  matcher: defaultMatcher,
};

export default Selection;
