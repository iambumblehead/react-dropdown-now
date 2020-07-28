import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import Menu from './components/Menu';
import Arrow from './components/Arrow';
import { useOutsideClick } from './hooks/use-outside-click';
import { prepareOptions, findSelected, defaultMatcher } from './helpers';
import { DEFAULT_PLACEHOLDER_STRING, BASE_DEFAULT_PROPS } from './constants';

function Dropdown({
  placeholder,
  options: originalOptions,
  matcher,
  value,
  disabled,
  onOpen,
  onClose,
  onFocus,
  onChange,
  onSelect,
  baseClassName,
  controlClassName,
  placeholderClassName,
  menuClassName,
  arrowClassName,
  arrowClosed,
  arrowOpen,
  className,
  noOptionsDisplay,
  innerRef,
}) {
  const options = useMemo(() => prepareOptions(originalOptions), [
    originalOptions,
  ]);
  const [selected, setSelected] = useState(
    findSelected(options, value, matcher),
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownNode = useRef();

  const handleOpenStateEvents = (dropdownIsOpen, closedBySelection) => {
    if (dropdownIsOpen && typeof onOpen === 'function') {
      onOpen();
    }

    if (!dropdownIsOpen && typeof onClose === 'function') {
      onClose(!!closedBySelection);
    }
  };

  useOutsideClick({
    ref: dropdownNode,
    handler: () => {
      if (isOpen) {
        setIsOpen(false);
        handleOpenStateEvents(false);
      }
    },
  });

  const handleMouseDown = (event) => {
    if (typeof onFocus === 'function') {
      onFocus(isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!disabled) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      handleOpenStateEvents(newIsOpen);
    }
  };

  const fireChangeEvent = (newSelectedState, e) => {
    if (onSelect) {
      onSelect(newSelectedState.option, e);
    }
    if (newSelectedState.id !== get(selected, 'id') && onChange) {
      onChange(newSelectedState.option, e);
    }
  };

  const setValue = (newValue, e) => {
    fireChangeEvent(newValue, e);
    setSelected(newValue);
    setIsOpen(false);
    handleOpenStateEvents(false, true);
  };

  const updateValue = useCallback((val) => {
    const newValue = findSelected(options, val, matcher);
    if (newValue) {
      fireChangeEvent(newValue);
      setSelected(newValue);
    }
  }, [options, matcher]);

  useEffect(() => updateValue(value), [value]);

  const isValueSelected = () => {
    return !!selected;
  };

  const disabledClass = disabled ? `${baseClassName}-disabled` : '';
  const placeHolderValue = get(
    selected,
    'option.label',
    placeholder || DEFAULT_PLACEHOLDER_STRING,
  );

  const dropdownClass = classNames({
    [`${baseClassName}-root`]: true,
    [className]: !!className,
    'is-open': isOpen,
  });
  const controlClass = classNames({
    [`${baseClassName}-control`]: true,
    [controlClassName]: !!controlClassName,
    [disabledClass]: !!disabledClass,
  });
  const placeholderClass = classNames({
    [`${baseClassName}-placeholder`]: true,
    [placeholderClassName]: !!placeholderClassName,
    'is-selected': isValueSelected(),
  });
  const menuClass = classNames({
    [`${baseClassName}-menu`]: true,
    [menuClassName]: !!menuClassName,
  });

  const valueDisplay = (
    <div className={placeholderClass}>{placeHolderValue}</div>
  );

  const menu = isOpen ? (
    <div className={menuClass} aria-expanded="true">
      <Menu
        selected={selected}
        options={options}
        baseClassName={baseClassName}
        noOptionsDisplay={noOptionsDisplay}
        onSelect={(e, selectedValue) => setValue(selectedValue, e)}
      />
    </div>
  ) : null;

  return (
    <div className={dropdownClass} ref={dropdownNode}>
      <div
        role="presentation"
        ref={innerRef}
        className={controlClass}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        aria-haspopup="listbox"
      >
        {valueDisplay}
        <Arrow
          isOpen={isOpen}
          baseClassName={baseClassName}
          arrowClassName={arrowClassName}
          arrowClosed={arrowClosed}
          arrowOpen={arrowOpen}
        />
      </div>
      {menu}
    </div>
  );
}

Dropdown.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  matcher: defaultMatcher,
  onOpen: () => {},
  onClose: () => {},
};

export default Dropdown;
