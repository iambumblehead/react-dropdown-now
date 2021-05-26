import React, { useCallback, useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import { Menu } from './components/Menu';
import { Arrow } from './components/Arrow';
import { Clear } from './components/Clear';
import { useOutsideClick } from './hooks/use-outside-click';
import {
  prepareOption,
  prepareOptions,
  findSelected,
  defaultMatcher,
} from './helpers';
import { DEFAULT_PLACEHOLDER_STRING, BASE_DEFAULT_PROPS } from './constants';
import { ReactDropdownProps, RenderItem } from './types';

export const Dropdown: React.FC<ReactDropdownProps> = ({
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
  menu: MenuContainer,
  clearIcon,
  isClearable,
}) => {
  const options = prepareOptions(originalOptions);
  const [selected, setSelected] = useState(
    findSelected(options, value, matcher),
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownNode = useRef(null);

  const handleOpenStateEvents = (dropdownIsOpen, closedBySelection = false) => {
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

  const eventStop = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleMouseDown = (
    event: React.MouseEvent | React.TouchEvent | unknown,
  ) => {
    if (typeof onFocus === 'function') {
      onFocus(isOpen);
    }
    if (
      (event as Event).type === 'mousedown' &&
      (event as MouseEvent).button !== 0
    )
      return;
    eventStop(event);

    if (!disabled) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      handleOpenStateEvents(newIsOpen);
    }
  };

  const isDropdownNodeEvent = (e?: React.SyntheticEvent) => {
    const { current } = dropdownNode;

    return Boolean(e && current && current.contains(e.target as Node));
  };

  const fireChangeEvent = (
    newSelectedState: RenderItem,
    e?: React.SyntheticEvent,
  ) => {
    if (!isDropdownNodeEvent(e)) {
      return;
    }
    if (onSelect) {
      onSelect(newSelectedState.option, e);
    }
    if (newSelectedState.id !== get(selected, 'id') && onChange) {
      onChange(newSelectedState.option, e);
    }
  };

  const setValue = (newValue: RenderItem, e: React.SyntheticEvent) => {
    fireChangeEvent(newValue, e);
    setSelected(newValue);
    setIsOpen(false);
    handleOpenStateEvents(false, true);
  };

  const updateValue = useCallback(
    (val, clearable = isClearable) => {
      const newValue = findSelected(options, val, matcher);
      if (val === undefined && clearable) {
        fireChangeEvent(prepareOption(undefined));
        setSelected(val);
      }

      if (newValue) {
        fireChangeEvent(newValue);
        setSelected(newValue);
      }
    },
    [options, matcher],
  );

  const handleClear = (event: React.SyntheticEvent) => {
    eventStop(event);

    updateValue(undefined, isClearable);
  };

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
    'is-open': isOpen,
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
        className={classNames(`${baseClassName}-control`, stateClassNames)}
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
        {selected && isClearable ? (
          <Clear
            stateClassNames={stateClassNames}
            clearIcon={clearIcon}
            onClick={handleClear}
            onMouseDown={eventStop}
            onTouchEnd={eventStop}
          />
        ) : null}
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
};

Dropdown.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  matcher: defaultMatcher,
  onOpen: () => undefined,
  onClose: () => undefined,
  menu: 'div',
};
