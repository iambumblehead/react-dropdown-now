import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import Menu from './Menu';
import { parseValue } from './helpers';
import { DEFAULT_PLACEHOLDER_STRING, BASE_DEFAULT_PROPS } from './constants';

class Dropdown extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: parseValue(props.value, props.options) || {
        label:
          typeof props.placeholder === 'undefined'
            ? DEFAULT_PLACEHOLDER_STRING
            : props.placeholder,
        value: ''
      },
      isOpen: false
    };
    this.mounted = true;
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentDidUpdate (prevProps) {
    if (this.props.value !== prevProps.value) {
      if (this.props.value) {
        let selected = parseValue(this.props.value, this.props.options);
        if (selected !== this.state.selected) {
          this.setState({ selected });
        }
      } else {
        this.setState({
          selected: {
            label:
              typeof this.props.placeholder === 'undefined'
                ? DEFAULT_PLACEHOLDER_STRING
                : this.props.placeholder,
            value: ''
          }
        });
      }
    }
  }

  componentWillUnmount () {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleOpenStateEvents = isOpen => {
    if (isOpen && typeof this.props.onOpen === 'function') {
      this.props.onOpen();
    }

    if (!isOpen && typeof this.props.onClose === 'function') {
      this.props.onClose();
    }
  };

  handleMouseDown = event => {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      const isOpen = !this.state.isOpen;
      this.setState({
        isOpen
      });
      this.handleOpenStateEvents(isOpen);
    }
  };

  setValue = (value, label) => {
    let newState = {
      selected: parseValue(value, this.props.options) || {
        value,
        label
      },
      isOpen: false
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
    this.handleOpenStateEvents(false);
  };

  fireChangeEvent = newState => {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  };

  handleDocumentClick = event => {
    if (this.mounted) {
      // eslint-disable-next-line react/no-find-dom-node
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
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

  render () {
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
      noOptionsDisplay
    } = this.props;

    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
    const placeHolderValue =
      typeof this.state.selected === 'string'
        ? this.state.selected
        : this.state.selected.label;

    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      [className]: !!className,
      'is-open': this.state.isOpen
    });
    const controlClass = classNames({
      [`${baseClassName}-control`]: true,
      [controlClassName]: !!controlClassName,
      [disabledClass]: !!disabledClass
    });
    const placeholderClass = classNames({
      [`${baseClassName}-placeholder`]: true,
      [placeholderClassName]: !!placeholderClassName,
      'is-selected': this.isValueSelected()
    });
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName
    });
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName
    });

    const value = <div className={placeholderClass}>{placeHolderValue}</div>;
    const menu = this.state.isOpen ? (
      <Menu
        expanded
        className={menuClass}
        selected={this.state.selected}
        options={options}
        baseClassName={baseClassName}
        noOptionsDisplay={noOptionsDisplay}
        onSelect={(e, value, label) => this.setValue(value, label)}
      />
    ) : null;

    const arrow = this.state.isOpen ? arrowOpen : arrowClosed;

    return (
      <div className={dropdownClass}>
        <div
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
  onClose: () => {}
};

export default Dropdown;
