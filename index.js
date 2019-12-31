import React, { Component } from 'react';
import classNames from 'classnames';

const BASE_CLASS = 'Dropdown';

const DEFAULT_PLACEHOLDER_STRING = 'Select...';

export const isValidLabelOrValue = value => (
  /string|boolean|number/.test(typeof value));

export const isValueSelected = value => (
  isValidLabelOrValue(value) || value !== '');

export const getSelectedValue = selected => (
  (selected && isValidLabelOrValue(selected.value))
    ? selected.value
    : selected
);

export const getSelectedLabel = selected => (
  (selected && isValidLabelOrValue(selected.label))
    ? selected.label
    : selected
);

export const getOptionName = option => option.name;

export const getOptionLabel = (option, label = option) => {
  if (isValidLabelOrValue(option.label))
    label = option.label;
  else if (isValidLabelOrValue(option.value))
    label = option.value;

  return label;
};

export const getOptionValue = (option, value = option) => {
  if (isValidLabelOrValue(option.value))
    value = option.value;
  else if (isValidLabelOrValue(option.label))
    value = option.label;

  return value;
};

export const parseOptionValue = (option, value, optionValue = null) => {
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

export const parseOptionsValue = (options, value) => {
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

export const Option = props => {
  const { option, selected, onSelect, baseClassName = BASE_CLASS } = props;
  const value = getOptionValue(option);
  const label = getOptionLabel(option);
  const isSelected = value === selected;

  return (
    <div
      className={[
        `${baseClassName}-option`,
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

export const OptionGroup = props => {
  const { option, selected, onSelect, baseClassName = BASE_CLASS } = props;

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

export const OptionsMenu = props => {
  const { options, selected, onSelect, baseClassName = BASE_CLASS } = props;

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

export const Arrow = props => {
  const {
    arrowOpen,
    arrowClosed,
    arrowClassName = 'arrow',
    baseClassName = BASE_CLASS,
    isOpen
  } = props;

  return (
    <div className={`${baseClassName}-arrow-wrapper`}>
      {arrowOpen && arrowClosed
        ? isOpen ? arrowOpen : arrowClosed
        : <span className={`${baseClassName}-arrow ${arrowClassName}`} />
      }
    </div>
  );
};

const createSelectedOption = (options, selectedValue, placeholder) => (
  parseOptionsValue(options, selectedValue) || {
    label: isValidLabelOrValue(placeholder)
      ? placeholder
      : DEFAULT_PLACEHOLDER_STRING,
    value: ''
  }
);

class Dropdown extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: createSelectedOption(
        props.options, props.value, props.placeholder),
      isOpen: false
    };
    this.containerElem = null;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this);
  }

  componentDidUpdate (prevProps) {
    let { props } = this;

    if (props.value !== prevProps.value) {
      const selected = createSelectedOption(
        props.options, props.value, props.placeholder);

      if (selected.value !== this.state.selected.value) {
        this.setState({ selected });
      }
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleMouseDown (event) {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;

    if (!this.props.disabled) {
      this.setState({ isOpen: !this.state.isOpen });
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
    if (this.containerElem instanceof Element &&
        !this.containerElem.contains(event.target) &&
        this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  render () {
    const {
      baseClassName,
      controlClassName,
      placeholderClassName,
      menuClassName,
      className
    } = this.props;

    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
    const placeHolderValue = getSelectedLabel(this.state.selected);
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

    return (
      <div className={dropdownClass} ref={c => this.containerElem = c}>
        <div
          className={controlClass}
          onMouseDown={e => this.handleMouseDown(e)}
          onTouchEnd={e => this.handleMouseDown(e)}
          aria-haspopup='listbox'>
          <div className={placeholderClass}>
            {placeHolderValue}
          </div>
          <Arrow {...this.props} isOpen={this.state.isOpen} />
        </div>
        {this.state.isOpen ? (
          <div className={menuClass} aria-expanded='true'>
            <OptionsMenu
              options={this.props.options}
              baseClassName={baseClassName}
              selected={getSelectedValue(this.state.selected)}
              onSelect={(e, value, label) => this.setValue(value, label)} />
          </div>
        ) : null}
      </div>
    );
  }
}

Dropdown.defaultProps = { baseClassName: BASE_CLASS };
export default Dropdown;
