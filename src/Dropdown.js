import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import Menu from './Menu';
import { useOutsideClick } from './hooks/use-outside-click';
import { parseValue } from './helpers';
import { DEFAULT_PLACEHOLDER_STRING, BASE_DEFAULT_PROPS } from './constants';

function Dropdown({
  placeholder,
  options,
  value,
  disabled,
  onOpen,
  onClose,
  onFocus,
  onChange,
  baseClassName,
  controlClassName,
  placeholderClassName,
  menuClassName,
  arrowClassName,
  arrowClosed,
  arrowOpen,
  className,
  noOptionsDisplay,
}) {
  const [selected, setSelected] = useState(
    parseValue(value, options) || {
      label:
        typeof placeholder === 'undefined'
          ? DEFAULT_PLACEHOLDER_STRING
          : placeholder,
      value: '',
    },
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

  const handleMouseDown = event => {
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

  const fireChangeEvent = newSelectedState => {
    if (newSelectedState !== selected && onChange) {
      onChange(newSelectedState);
    }
  };

  const setValue = (newValue, newLabel) => {
    const newSelectedState = parseValue(newValue, options) || {
      value: newValue,
      label: newLabel,
    };
    fireChangeEvent(newSelectedState);
    setSelected(newSelectedState);
    setIsOpen(false);
    handleOpenStateEvents(false, true);
  };

  const isValueSelected = () => {
    return Boolean(typeof selected === 'string' || selected.value !== '');
  };

  const disabledClass = disabled ? `${baseClassName}-disabled` : '';
  const placeHolderValue =
    typeof selected === 'string' ? selected : selected.label;

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
  const arrowClass = classNames({
    [`${baseClassName}-arrow`]: true,
    [arrowClassName]: !!arrowClassName,
  });

  const valueDisplay = (
    <div className={placeholderClass}>{placeHolderValue}</div>
  );

  const menu = isOpen ? (
    <div className={className} aria-expanded>
      <Menu
        expanded
        className={menuClass}
        selected={selected}
        options={options}
        baseClassName={baseClassName}
        noOptionsDisplay={noOptionsDisplay}
        onSelect={(e, selectedValue, label) => setValue(selectedValue, label)}
      />
    </div>
  ) : null;

  const arrow = isOpen ? arrowOpen : arrowClosed;

  return (
    <div className={dropdownClass} ref={dropdownNode}>
      <div
        role="presentation"
        className={controlClass}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        aria-haspopup="listbox"
      >
        {valueDisplay}
        <div className={`${baseClassName}-arrow-wrapper`}>
          {arrowOpen && arrowClosed ? arrow : <span className={arrowClass} />}
        </div>
      </div>
      {menu}
    </div>
  );
}

Dropdown.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  onOpen: () => {},
  onClose: () => {},
};

export default Dropdown;
