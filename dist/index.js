"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Option = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DEFAULT_BASE_CLASSNAME = 'Dropdown';
var DEFAULT_PLACEHOLDER_STRING = 'Select...';

var isValidLabelOrValue = function isValidLabelOrValue(value) {
  return /string|boolean|number/.test(_typeof(value));
};

var getOptionLabel = function getOptionLabel(option) {
  var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : option;
  if (isValidLabelOrValue(option.label)) label = option.label;else if (isValidLabelOrValue(option.value)) label = option.value;
  return label;
};

var getOptionValue = function getOptionValue(option) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : option;
  if (isValidLabelOrValue(option.value)) value = option.value;else if (isValidLabelOrValue(option.label)) value = option.label;
  return value;
};

var getSelectedValue = function getSelectedValue(selected) {
  return selected && isValidLabelOrValue(selected.value) ? selected.value : selected;
};

var Option = function Option(_ref) {
  var option = _ref.option,
      selected = _ref.selected,
      baseClassName = _ref.baseClassName,
      onSelect = _ref.onSelect;
  var value = getOptionValue(option);
  var label = getOptionLabel(option);
  var isSelected = value === selected;
  return _react["default"].createElement("div", {
    className: ["".concat(baseClassName || DEFAULT_BASE_CLASSNAME, "-option"), option.className, isSelected ? 'is-selected' : ''].filter(function (e) {
      return e;
    }).join(' '),
    onMouseDown: function onMouseDown(e) {
      return onSelect(e, value, label);
    },
    onClick: function onClick(e) {
      return onSelect(e, value, label);
    },
    role: "option",
    "aria-selected": String(isSelected)
  }, label);
};

exports.Option = Option;

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, props));
    _this.state = {
      selected: _this.parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
        value: ''
      },
      isOpen: false
    };
    _this.mounted = true;
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized(_this));
    _this.fireChangeEvent = _this.fireChangeEvent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.value !== prevProps.value) {
        if (this.props.value) {
          var selected = this.parseValue(this.props.value, this.props.options);

          if (selected !== this.state.selected) {
            this.setState({
              selected: selected
            });
          }
        } else {
          this.setState({
            selected: {
              label: typeof this.props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : this.props.placeholder,
              value: ''
            }
          });
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick, false);
      document.addEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      document.removeEventListener('click', this.handleDocumentClick, false);
      document.removeEventListener('touchend', this.handleDocumentClick, false);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
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
  }, {
    key: "parseValue",
    value: function parseValue(value, options) {
      var option;

      if (typeof value === 'string') {
        for (var i = 0, num = options.length; i < num; i++) {
          if (options[i].type === 'group') {
            var match = options[i].items.filter(function (item) {
              return item.value === value;
            });

            if (match.length) {
              var _match = _slicedToArray(match, 1);

              option = _match[0];
            }
          } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
            option = options[i];
          }
        }
      }

      return option || value;
    }
  }, {
    key: "setValue",
    value: function setValue(value, label) {
      var newState = {
        selected: {
          value: value,
          label: label
        },
        isOpen: false
      };
      this.fireChangeEvent(newState);
      this.setState(newState);
    }
  }, {
    key: "fireChangeEvent",
    value: function fireChangeEvent(newState) {
      if (newState.selected !== this.state.selected && this.props.onChange) {
        this.props.onChange(newState.selected);
      }
    }
  }, {
    key: "buildMenu",
    value: function buildMenu() {
      var _this2 = this;

      var _this$props = this.props,
          options = _this$props.options,
          baseClassName = _this$props.baseClassName;
      var ops = options.map(function (option) {
        if (option.type === 'group') {
          var groupTitle = _react["default"].createElement("div", {
            className: "".concat(baseClassName, "-title")
          }, option.name);

          return _react["default"].createElement("div", {
            className: "".concat(baseClassName, "-group"),
            key: option.name,
            role: "listbox",
            tabIndex: "-1"
          }, groupTitle, option.items.map(function (item) {
            return _react["default"].createElement(Option, {
              key: getOptionValue(option),
              option: item,
              selected: getSelectedValue(_this2.state.selected),
              baseClassName: baseClassName,
              onSelect: function onSelect(e, value, label) {
                return _this2.setValue(value, label);
              }
            });
          }));
        }

        return _react["default"].createElement(Option, {
          key: getOptionValue(option),
          option: option,
          selected: getSelectedValue(_this2.state.selected),
          baseClassName: baseClassName,
          onSelect: function onSelect(e, value, label) {
            return _this2.setValue(value, label);
          }
        });
      });
      return ops.length ? ops : _react["default"].createElement("div", {
        className: "".concat(baseClassName, "-noresults")
      }, "No options found");
    }
  }, {
    key: "handleDocumentClick",
    value: function handleDocumentClick(event) {
      if (this.mounted) {
        // eslint-disable-next-line react/no-find-dom-node
        if (!_reactDom["default"].findDOMNode(this).contains(event.target)) {
          if (this.state.isOpen) {
            this.setState({
              isOpen: false
            });
          }
        }
      }
    }
  }, {
    key: "isValueSelected",
    value: function isValueSelected() {
      var selected = this.state.selected;
      return Boolean(typeof selected === 'string' || selected.value !== '');
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames, _classNames2, _classNames3, _classNames4, _classNames5;

      var _this$props2 = this.props,
          baseClassName = _this$props2.baseClassName,
          controlClassName = _this$props2.controlClassName,
          placeholderClassName = _this$props2.placeholderClassName,
          menuClassName = _this$props2.menuClassName,
          arrowClassName = _this$props2.arrowClassName,
          arrowClosed = _this$props2.arrowClosed,
          arrowOpen = _this$props2.arrowOpen,
          className = _this$props2.className;
      var disabledClass = this.props.disabled ? 'Dropdown-disabled' : '';
      var placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
      var dropdownClass = (0, _classnames["default"])((_classNames = {}, _defineProperty(_classNames, "".concat(baseClassName, "-root"), true), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, 'is-open', this.state.isOpen), _classNames));
      var controlClass = (0, _classnames["default"])((_classNames2 = {}, _defineProperty(_classNames2, "".concat(baseClassName, "-control"), true), _defineProperty(_classNames2, controlClassName, !!controlClassName), _defineProperty(_classNames2, disabledClass, !!disabledClass), _classNames2));
      var placeholderClass = (0, _classnames["default"])((_classNames3 = {}, _defineProperty(_classNames3, "".concat(baseClassName, "-placeholder"), true), _defineProperty(_classNames3, placeholderClassName, !!placeholderClassName), _defineProperty(_classNames3, 'is-selected', this.isValueSelected()), _classNames3));
      var menuClass = (0, _classnames["default"])((_classNames4 = {}, _defineProperty(_classNames4, "".concat(baseClassName, "-menu"), true), _defineProperty(_classNames4, menuClassName, !!menuClassName), _classNames4));
      var arrowClass = (0, _classnames["default"])((_classNames5 = {}, _defineProperty(_classNames5, "".concat(baseClassName, "-arrow"), true), _defineProperty(_classNames5, arrowClassName, !!arrowClassName), _classNames5));

      var value = _react["default"].createElement("div", {
        className: placeholderClass
      }, placeHolderValue);

      var menu = this.state.isOpen ? _react["default"].createElement("div", {
        className: menuClass,
        "aria-expanded": "true"
      }, this.buildMenu()) : null;
      return _react["default"].createElement("div", {
        className: dropdownClass
      }, _react["default"].createElement("div", {
        className: controlClass,
        onMouseDown: this.handleMouseDown.bind(this),
        onTouchEnd: this.handleMouseDown.bind(this),
        "aria-haspopup": "listbox"
      }, value, _react["default"].createElement("div", {
        className: "".concat(baseClassName, "-arrow-wrapper")
      }, arrowOpen && arrowClosed ? this.state.isOpen ? arrowOpen : arrowClosed : _react["default"].createElement("span", {
        className: arrowClass
      }))), menu);
    }
  }]);

  return Dropdown;
}(_react.Component);

Dropdown.defaultProps = {
  baseClassName: DEFAULT_BASE_CLASSNAME
};
var _default = Dropdown;
exports["default"] = _default;
