import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const DEFAULT_BASE_CLASSNAME = 'Dropdown';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

const isValidLabelOrValue = value => (
  /string|boolean|number/.test(typeof value));

const isValueSelected = value => isValidLabelOrValue(value) || value !== '';

const getOptionName = option => option.name;

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

const parseOptionValue = (option, value, optionValue = null) => {
  if (option.type === 'group') {
    const match = option.items.filter(item => item.value === value);
    if (match.length) {
      [ optionValue ] = match;
    }
  } else if (
    isValidLabelOrValue(option.value)
      && getOptionValue(option) === value) {
    optionValue = option;
  }

  return optionValue;
};

const parseOptionsValue = (options, value) => {
  console.log({ options, value });

  if (typeof value === 'string') {
    for (let i = options.length, optionValue; i--;) {
      optionValue = parseOptionValue(options[i], value);

      if (optionValue !== null) {
        value = optionValue;
        break;
      }
    }
  }

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

export const OptionGroup = ({ option, selected, baseClassName, onSelect }) => {
  baseClassName = isValidLabelOrValue(baseClassName)
    ? baseClassName
    : DEFAULT_BASE_CLASSNAME;

  return (
    <div
      className={`${baseClassName}-group`}
      key={option.name}
      role='listbox'
      tabIndex='-1'>
      <div className={`${baseClassName}-title`}>
        {option.name}
      </div>
      {option.items.map(item => (
        <Option
          key={getOptionValue(item)}
          option={item}
          selected={selected}
          baseClassName={baseClassName}
          onSelect={onSelect} />
      ))}
    </div>
  );
};

export const OptionsMenu = ({ options, selected, baseClassName, onSelect }) => {
  baseClassName = isValidLabelOrValue(baseClassName)
    ? baseClassName
    : DEFAULT_BASE_CLASSNAME;

  if (options.length === 0) {
    return (
      <div className={`${baseClassName}-noresults`}>
        No options found
      </div>
    );
  }

  return options.map(option => option.type === 'group' ? (
    <OptionGroup
      key={getOptionName(option)}
      option={option}
      selected={selected}
      baseClassName={baseClassName}
      onSelect={onSelect} />
  ) : (
    <Option
      key={getOptionValue(option)}
      option={option}
      selected={selected}
      baseClassName={baseClassName}
      onSelect={onSelect} />
  ));
};

class Dropdown extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: parseOptionsValue(props.options, props.value) || {
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
        let selected = parseOptionsValue(this.props.options, this.props.value);
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
      'is-selected': isValueSelected(this.state.selected)
    });
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName
    });
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName
    });

    return (
      <div className={dropdownClass}>
        <div
          className={controlClass}
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchEnd={this.handleMouseDown.bind(this)}
          aria-haspopup='listbox'>
          <div className={placeholderClass}>
            {placeHolderValue}
          </div>
          <div className={`${baseClassName}-arrow-wrapper`}>
            {arrowOpen && arrowClosed
              ? this.state.isOpen ? arrowOpen : arrowClosed
              : <span className={arrowClass} />}
          </div>
        </div>
        {this.state.isOpen ? (
          <div className={menuClass} aria-expanded='true'>
            <OptionsMenu
              options={this.props.options}
              baseClassName={this.props.baseClassName}
              selected={getSelectedValue(this.state.selected)}
              onSelect={(e, value, label) => this.setValue(value, label)} />
          </div>
        ) : null}
      </div>
    );
  }
}

Dropdown.defaultProps = { baseClassName: DEFAULT_BASE_CLASSNAME };
export default Dropdown;
