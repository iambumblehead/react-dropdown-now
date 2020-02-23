# react-dropdown-now

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
![Build Status][build-image]

The [demo page is here.][1] react-dropdown-now is a [fork of react-dropdown.][0]

```Javascript
import Dropdown from 'react-dropdown-now';
import 'react-dropdown-now/style.css';

<Dropdown
  placeholder="Select an option"
  options={['one', 'two', 'three']}
  value="one"
  onChange={() => console.log('change!')}
  onClose={() => console.log('close!')}
  onOpen={() => console.log('open!')} />;
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
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', className: 'myOptionClassName' },
  {
   type: 'group', name: 'group1', items: [
     { value: 'three', label: 'Three', className: 'myOptionClassName' },
     { value: 'four', label: 'Four' }
   ]
  },
  {
   type: 'group', name: 'group2', items: [
     { value: 'five', label: 'Five' },
     { value: 'six', label: 'Six' }
   ]
  }
];
```

When using Object options you can add to each option a className string to further customize the dropdown, e.g. adding icons to options

**Disabled**

```JavaScript
<Dropdown disabled option={options} value={defaultOption} />;
```

---

### Customizing

**className**

The `className` prop is passed down to the wrapper `div`, which also has the `Dropdown-root` class.

```JavaScript
<Dropdown className='myClassName' />;
```

**controlClassName**

The `controlClassName` prop is passed down to the control `div`, which also has the `Dropdown-control` class.

```JavaScript
<Dropdown controlClassName='myControlClassName' />;
```

**placeholderClassName**

The `placeholderClassName` prop is passed down to the placeholder `div`, which also has the `Dropdown-placeholder` class.

```JavaScript
<Dropdown placeholderClassName='myPlaceholderClassName' />;
```

**menuClassName**

The `menuClassName` prop is passed down to the menu `div` (the one that opens and closes and holds the options), which also has the `Dropdown-menu` class.

```JavaScript
<Dropdown menuClassName='myMenuClassName' />;
```

**arrowClassName**

The `arrowClassName` prop is passed down to the arrow `span` , which also has the `Dropdown-arrow` class.

```JavaScript
<Dropdown arrowClassName='myArrowClassName' />;
```

**arrowClosed**, **arrowOpen**

The `arrowClosed` & `arrowOpen` props enable passing in custom elements for the open/closed state arrows.

```JavaScript
<Dropdown
  arrowClosed={<span className="arrow-closed" />}
  arrowOpen={<span className="arrow-open" />} />;
```

More [examples in the docs folder.][2]

[0]: https://github.com/fraserxu/react-dropdown/issues/183
[1]: https://iambumblehead.github.io/react-dropdown-now/
[2]: https://github.com/iambumblehead/react-dropdown-now/tree/master/docs

### License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-image]: https://img.shields.io/npm/v/react-dropdown-now.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-dropdown-now
[downloads-image]: http://img.shields.io/npm/dm/react-dropdown-now.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-dropdown-now
[build-image]: https://github.com/iambumblehead/react-dropdown-now/workflows/test-component/badge.svg
