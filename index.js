import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const DEFAULT_BASE_CLASSNAME = 'Dropdown';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

const isValidLabelOrValue = value => (
  /string|boolean|number/.test(typeof value));

const getOptionLabel = (option, label = option) => {
  if (isValidLabelOrValue(option.label))
    label = option.label;
  else if (isValidLabelOrValue(option.value))
    label = option.value;

  return label;
};

const getOptionValue = (option, value = option) => {
  if (isValidLabelOrValue(option.value))
    value = option.value;
  else if (isValidLabelOrValue(option.label))
    value = option.label;

  return value;
};

const getSelectedValue = selected => (
  (selected && isValidLabelOrValue(selected.value))
    ? selected.value
    : selected
);

export const Option = ({ option, selected, baseClassName, onSelect }) => {
  const value = getOptionValue(option);
  const label = getOptionLabel(option);
  const isSelected = value === selected;

  return (
    <div
      className={[
        `${baseClassName || DEFAULT_BASE_CLASSNAME}-option`,
        option.className,
        isSelected ? 'is-selected' : ''
      ].filter(e => e).join(' ')}
      onMouseDown={e => onSelect(e, value, label)}
      onClick={e => onSelect(e, value, label)}
      role='option'
      aria-selected={String(isSelected)}>
      {label}
    </div>
  );
};

class Dropdown extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: this.parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined'
          ? DEFAULT_PLACEHOLDER_STRING
          : props.placeholder,
        value: ''
      },
      isOpen: false
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this);
  }

  componentDidUpdate (prevProps) {
    if (this.props.value !== prevProps.value) {
      if (this.props.value) {
        let selected = this.parseValue(this.props.value, this.props.options);
        if (selected !== this.state.selected) {
          this.setState({ selected });
        }
      } else {
        this.setState({
          selected: {
            label: typeof this.props.placeholder === 'undefined'
              ? DEFAULT_PLACEHOLDER_STRING
              : this.props.placeholder,
            value: ''
          }
        });
      }
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleMouseDown (event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  parseValue (value, options) {
    let option;

    if (typeof value === 'string') {
      for (let i = 0, num = options.length; i < num; i++) {
        if (options[i].type === 'group') {
          const match = options[i].items.filter(item => item.value === value);
          if (match.length) {
            [ option ] = match;
          }
        } else if (
          typeof options[i].value !== 'undefined' && options[i].value === value
        ) {
          option = options[i];
        }
      }
    }

    return option || value;
  }

  setValue (value, label) {
    let newState = {
      selected: {
        value,
        label
      },
      isOpen: false
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected);
    }
  }

  buildMenu () {
    let { options, baseClassName } = this.props;
    let ops = options.map(option => {
      if (option.type === 'group') {
        let groupTitle = (
          <div className={`${baseClassName}-title`}>
            {option.name}
          </div>
        );
        return (
          <div
            className={`${baseClassName}-group`}
            key={option.name} role='listbox'
            tabIndex='-1'
          >
            {groupTitle}
            {option.items.map(item => (
              <Option
                key={getOptionValue(option)}
                option={item}
                selected={getSelectedValue(this.state.selected)}
                baseClassName={baseClassName}
                onSelect={(e, value, label) => this.setValue(value, label)}
              />
            ))}
          </div>
        );
      }

      return (
        <Option
          key={getOptionValue(option)}
          option={option}
          selected={getSelectedValue(this.state.selected)}
          baseClassName={baseClassName}
          onSelect={(e, value, label) => this.setValue(value, label)}
        />
      );
    });

    return ops.length ? ops : (
      <div className={`${baseClassName}-noresults`}>
        No options found
      </div>
    );
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      // eslint-disable-next-line react/no-find-dom-node
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false });
        }
      }
    }
  }

  isValueSelected () {
    let { selected } = this.state;

    return Boolean(
      typeof selected === 'string' || selected.value !== ''
    );
  }

  render () {
    const {
      baseClassName,
      controlClassName,
      placeholderClassName,
      menuClassName,
      arrowClassName,
      arrowClosed,
      arrowOpen,
      className
    } = this.props;

    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
    const placeHolderValue = typeof this.state.selected === 'string'
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

    const value = (
      <div className={placeholderClass}>
        {placeHolderValue}
      </div>
    );
    const menu = this.state.isOpen ? (
      <div className={menuClass} aria-expanded='true'>
        {this.buildMenu()}
      </div>
    ) : null;

    return (
      <div className={dropdownClass}>
        <div
          className={controlClass}
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchEnd={this.handleMouseDown.bind(this)}
          aria-haspopup='listbox'
        >
          {value}
          <div className={`${baseClassName}-arrow-wrapper`}>
            {arrowOpen && arrowClosed
              ? this.state.isOpen ? arrowOpen : arrowClosed
              : <span className={arrowClass} />}
          </div>
        </div>
        {menu}
      </div>
    );
  }
}

Dropdown.defaultProps = { baseClassName: DEFAULT_BASE_CLASSNAME };
export default Dropdown;
