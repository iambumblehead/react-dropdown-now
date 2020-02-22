import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Menu from './Menu';
import { parseValue } from './helpers';
import { DEFAULT_PLACEHOLDER_STRING, BASE_DEFAULT_PROPS } from './constants';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: parseValue(props.value, props.options) || {
        label:
          typeof props.placeholder === 'undefined'
            ? DEFAULT_PLACEHOLDER_STRING
            : props.placeholder,
        value: '',
      },
      isOpen: false,
    };
    this.mounted = true;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentDidUpdate(prevProps) {
    const { selected: selectedState } = this.state;
    const { value, options, placeholder } = this.props;
    if (value !== prevProps.value) {
      if (value) {
        const selected = parseValue(value, options);
        if (selected !== selectedState) {
          // eslint-disable-next-line react/no-did-update-set-state
          this.setState({ selected });
        }
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          selected: {
            label:
              typeof placeholder === 'undefined'
                ? DEFAULT_PLACEHOLDER_STRING
                : placeholder,
            value: '',
          },
        });
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleOpenStateEvents = isOpen => {
    const { onOpen, onClose } = this.props;
    if (isOpen && typeof onOpen === 'function') {
      onOpen();
    }

    if (!isOpen && typeof onClose === 'function') {
      onClose();
    }
  };

  handleMouseDown = event => {
    const { onFocus, disabled } = this.props;
    const { isOpen } = this.state;
    if (typeof onFocus === 'function') {
      onFocus(isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!disabled) {
      const newIsOpen = !isOpen;
      this.setState({
        isOpen: newIsOpen,
      });
      this.handleOpenStateEvents(newIsOpen);
    }
  };

  setValue = (value, label) => {
    const { options } = this.props;
    const newState = {
      selected: parseValue(value, options) || {
        value,
        label,
      },
      isOpen: false,
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
    this.handleOpenStateEvents(false);
  };

  fireChangeEvent = newState => {
    const { onChange } = this.props;
    const { selected } = this.state;
    if (newState.selected !== selected && onChange) {
      onChange(newState.selected);
    }
  };

  handleDocumentClick = event => {
    const { isOpen } = this.state;
    if (this.mounted) {
      // eslint-disable-next-line react/no-find-dom-node
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (isOpen) {
          this.setState({ isOpen: false });
          this.handleOpenStateEvents(false);
        }
      }
    }
  };

  isValueSelected = () => {
    const { selected } = this.state;

    return Boolean(typeof selected === 'string' || selected.value !== '');
  };

  render() {
    const { selected, isOpen } = this.state;
    const {
      baseClassName,
      controlClassName,
      placeholderClassName,
      menuClassName,
      arrowClassName,
      arrowClosed,
      arrowOpen,
      className,
      options,
      disabled,
      noOptionsDisplay,
    } = this.props;

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
      'is-selected': this.isValueSelected(),
    });
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName,
    });
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName,
    });

    const value = <div className={placeholderClass}>{placeHolderValue}</div>;
    const menu = isOpen ? (
      <Menu
        expanded
        className={menuClass}
        selected={selected}
        options={options}
        baseClassName={baseClassName}
        noOptionsDisplay={noOptionsDisplay}
        onSelect={(e, selectedValue, label) =>
          this.setValue(selectedValue, label)
        }
      />
    ) : null;

    const arrow = isOpen ? arrowOpen : arrowClosed;

    return (
      <div className={dropdownClass}>
        <div
          role="presentation"
          className={controlClass}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleMouseDown}
          aria-haspopup="listbox"
        >
          {value}
          <div className={`${baseClassName}-arrow-wrapper`}>
            {arrowOpen && arrowClosed ? arrow : <span className={arrowClass} />}
          </div>
        </div>
        {menu}
      </div>
    );
  }
}

Dropdown.defaultProps = {
  ...BASE_DEFAULT_PROPS,
  onOpen: () => {},
  onClose: () => {},
};

export default Dropdown;
