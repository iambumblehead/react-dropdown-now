# react-dropdown-now

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Build Status][build-image]][repo-url]

The [demo page is here.][1] react-dropdown-now is a [fork of react-dropdown.][0]

> requires React >= 16.8

```Javascript
import { Dropdown, Selection } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';

// normal usage
<Dropdown
  placeholder="Select an option"
  className="my-className"
  options={['one', 'two', 'three']}
  value="one"
  onChange={(value) => console.log('change!', value)}
  onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
  onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
  onOpen={() => console.log('open!')}
/>;

// use the Selection component with other components like popovers etc.
<Selection
  options={['one', 'two', 'three']}
  value="one"
  onChange={(value) => console.log('change!', value)}
/>;
```

**Flat Array options**

```JavaScript
const options = [
  'one', 'two', 'three'
];
```

**Object Array options**

```JavaScript
const options = [
  { id: 'one', value: 'one', label: 'One', view: <span>One</span> },
  { value: 'two', label: 'Two', className: 'myOptionClassName' },
  {
   name: 'group1',
   items: [
     { value: 'three', label: 'Three', className: 'myOptionClassName' },
     { value: 'four', label: 'Four' }
   ]
  },
  {
    name: 'group2',
    items: [
     { value: 'five', label: 'Five' },
     { value: 'six', label: 'Six' }
   ]
  }
];
```

When using Object options you can add to each option:

- a `className` string to further customize the dropdown, e.g. adding icons to options
- a `view` node to render an isolated view in the dropdown options list which is different from what could be seen in the dropdown control (selected value)
- an `id` string can be used to give an id to each option. Must be unique; even when mixing grouped options with single options. Useful for when `option.value` is not a `string` or `number`. Can be used with a custom matcher to determine the selected option.

**Disabled**

```js
<Dropdown disabled option={options} value={defaultOption} />
```

**matcher**

The default matcher will use the value prop to match against values within the options array.

custom matcher example:

```js
const value = 'custom-id';
const options = [{ id: 'custom-id', value: 1, label: 'awesome' }];

<Dropdown
  option={options}
  value={value}
  matcher={(item, val) => {
    // item => { id, option: {id, value, label} }
    return item.id === val;
  }}
/>;
```

---

### Customizing

| Classname                 | Targets                                         |
| :------------------------ | :---------------------------------------------- |
| `rdn`                     | main wrapper div                                |
| `rdn-control`             | dropdown control                                |
| `rdn-control-arrow`       | dropdown arrow indicator                        |
| `rdn-control-placeholder` | placeholder / selected item in dropdown control |
| `rdn-drop`                | container for dropdown options                  |

#### Using custom arrows

**arrowClosed**, **arrowOpen**

The `arrowClosed` & `arrowOpen` props enable passing in custom elements for the open/closed state arrows.

```JavaScript
<Dropdown
  arrowClosed={<span className="arrow-closed" />}
  arrowOpen={<span className="arrow-open" />} />;
```

More [examples in the stories folder.][2]

### Migration

#### v4 => v5

- import statements have changed, please update imports.
- added Typescript support using rollup

#### v3 => v4

- removed configurable classNames `placeholderClassName`, `arrowClassName`, `menuClassName` and `controlClassName`
- [changed classNames][10] to use className prefixing. stylesheets targeting the v3 component will need to be updated

#### v2 => v3

- `onChange` always returns an object with aleast `{value, label}`
- `option.type` is no longer needed to determine if the option is a group. Once the option has an `items` array then it is assumed to be a group.

### License

**MIT**

[0]: https://github.com/fraserxu/react-dropdown/issues/183
[1]: https://iambumblehead.github.io/react-dropdown-now/
[2]: https://github.com/iambumblehead/react-dropdown-now/tree/master/src/stories
[10]: https://github.com/iambumblehead/react-dropdown-now/pull/71/files#diff-96444c2208ab41b33ce225669e78e3b3426b43216f64e4c34398d6c0d50918e9
[npm-image]: https://img.shields.io/npm/v/react-dropdown-now.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-dropdown-now
[downloads-image]: http://img.shields.io/npm/dm/react-dropdown-now.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-dropdown-now
[build-image]: https://github.com/iambumblehead/react-dropdown-now/workflows/test-component/badge.svg
[repo-url]: https://github.com/iambumblehead/react-dropdown-now
