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
  arrowClosed,
  arrowOpen,
  className,
  noOptionsDisplay,
  innerRef,
  menu: MenuContainer
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

  const placeHolderValue = get(
    selected,
    'option.label',
    placeholder || DEFAULT_PLACEHOLDER_STRING,
  );

  const stateClassNames = {
    [className]: !!className,
    'is-disabled': disabled,
    'is-empty': !options.length,
    'is-open': isOpen
  };

  const menu = isOpen ? (
    <MenuContainer
      data-testid="dropdown-menu"
      className={classNames({
        [`${baseClassName}-drop`]: true,
        ...stateClassNames,
      })}
      aria-expanded="true"
    >
      <Menu
        selected={selected}
        options={options}
        stateClassNames={{ [className]: !!className }}
        baseClassName={`${baseClassName}-drop`}
        noOptionsDisplay={noOptionsDisplay}
        onSelect={(e, selectedValue) => setValue(selectedValue, e)}
      />
    </MenuContainer>
  ) : null;

  return (
    <div
      data-testid="dropdown-root"
      className={classNames({
        [baseClassName]: true,
        ...stateClassNames,
      })}
      ref={dropdownNode}
    >
      <div
        data-testid="dropdown-control"
        role="presentation"
        ref={innerRef}
        className={classNames({
          [`${baseClassName}-control`]: true,
          ...stateClassNames,
        })}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
      >
        <div
          data-testid="dropdown-placeholder"
          className={classNames({
            [`${baseClassName}-control-placeholder`]: true,
            'is-selected': !!selected,
            ...stateClassNames,
          })}
        >
          {placeHolderValue}
        </div>
        <Arrow
          isOpen={isOpen}
          stateClassNames={stateClassNames}
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
  onOpen: () => undefined,
  onClose: () => undefined,
  menu: 'div'
};


export default Dropdown;
