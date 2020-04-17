import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import ReactDropdownNow from '../src';
import Menu from '../src/components/Menu';

test('ReactDropdownNow, opens', (t) => {
  const onOpen = sinon.spy();
  const component = mount(
    <ReactDropdownNow
      options={['one', 'two', 'three']}
      onOpen={onOpen}
      value="one"
    />,
  );

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.find('.Dropdown-root').hasClass('is-open'));
  t.true(onOpen.calledOnce);
  component.unmount();
});

test('ReactDropdownNow, calls onChange', (t) => {
  const onOpen = sinon.spy();
  const onClose = sinon.spy();
  const onChange = sinon.spy();
  const component = mount(
    <ReactDropdownNow
      options={['one', 'two', 'three']}
      value="one"
      onOpen={onOpen}
      onClose={onClose}
      onChange={onChange}
    />,
  );

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });

  component.find('.Dropdown-option').at(2).simulate('mousedown', { button: 0 });

  t.true(onOpen.calledOnce);
  t.true(onChange.calledOnce);
  t.true(onClose.calledOnce);
  t.false(component.find('.Dropdown-root').hasClass('is-open'));
  component.unmount();
});

test('ReactDropdownNow, uses and updates the selected value state', (t) => {
  const onOpen = sinon.spy();
  const component = mount(
    <ReactDropdownNow
      options={['one', 'two', 'three']}
      onOpen={onOpen}
      value="one"
    />,
  );

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });

  t.is(component.find(Menu).find('.Dropdown-option.is-selected').text(), 'one');
  t.true(component.find('.Dropdown-root').hasClass('is-open'));

  component
    .find(Menu)
    .find('.Dropdown-option')
    .at(2)
    .simulate('mousedown', { button: 0 });

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.find('.Dropdown-root').hasClass('is-open'));
  t.is(
    component.find(Menu).find('.Dropdown-option.is-selected').text(),
    'three',
  );

  component.unmount();
});

test('ReactDropdownNow, should render same open shut arrow class', (t) => {
  const component = mount(
    <ReactDropdownNow options={['one', 'two', 'three']} value="one" />,
  );

  t.true(component.exists('.Dropdown-arrow'));
  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.exists('.Dropdown-arrow'));
});

test('ReactDropdownNow, should render custom open shut arrow elems', (t) => {
  const arrowClosedElem = <span className="arrow-closed" />;
  const arrowOpenedElem = <span className="arrow-opened" />;
  const component = mount(
    <ReactDropdownNow
      options={['one', 'two', 'three']}
      value="one"
      arrowClosed={arrowClosedElem}
      arrowOpen={arrowOpenedElem}
    />,
  );

  t.true(component.exists('.Dropdown-arrow-wrapper > .arrow-closed'));
  t.false(component.exists('.Dropdown-arrow-wrapper > .arrow-opened'));
  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.false(component.exists('.Dropdown-arrow-wrapper > .arrow-closed'));
  t.true(component.exists('.Dropdown-arrow-wrapper > .arrow-opened'));
});

test('ReactDropdownNow, should render custom open shut arrow classNames', (t) => {
  const component = mount(
    <ReactDropdownNow
      options={['one', 'two', 'three']}
      value="one"
      arrowClassName="arrow-class"
    />,
  );

  t.true(component.exists('.Dropdown-arrow-wrapper > .arrow-class'));
  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.exists('.Dropdown-arrow-wrapper > .arrow-class'));
});

test('ReactDropdownNow, should render custom option classNames', (t) => {
  const component = mount(
    <ReactDropdownNow
      options={[
        { value: 'item', label: 'item', className: 'item' },
        {
          type: 'group',
          name: 'group',
          items: [
            {
              value: 'group item',
              label: 'group item',
              className: 'group-item',
            },
          ],
        },
      ]}
      value="one"
    />,
  );

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  const menu = component.find(Menu);

  t.true(menu.exists('.Dropdown-option.item'));
  t.true(menu.exists('.Dropdown-group > .group-item'));
});

test('ReactDropdownNow, should render menuClassName', (t) => {
  const component = mount(
    <ReactDropdownNow
      menuClassName="menu-class"
      options={[
        { value: 'item', label: 'item', className: 'item' },
        {
          type: 'group',
          name: 'group',
          items: [
            {
              value: 'group item',
              label: 'group item',
              className: 'group-item',
            },
          ],
        },
      ]}
      value="one"
    />,
  );

  t.false(component.exists('.Dropdown-menu.menu-class'));
  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.exists('.Dropdown-menu.menu-class'));
});

test('ReactDropdownNow, should render placeholderClassName', (t) => {
  const component = mount(
    <ReactDropdownNow
      placeholderClassName="placeholder-class"
      options={[
        { value: 'item', label: 'item', className: 'item' },
        {
          type: 'group',
          name: 'group',
          items: [
            {
              value: 'group item',
              label: 'group item',
              className: 'group-item',
            },
          ],
        },
      ]}
    />,
  );

  t.true(
    component.exists(
      '.Dropdown-control > .Dropdown-placeholder.placeholder-class',
    ),
  );
  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  component.find('.Dropdown-option').at(1).simulate('mousedown', { button: 0 });
  t.true(
    component.exists(
      '.Dropdown-control > .Dropdown-placeholder.placeholder-class.is-selected',
    ),
  );
});

test('ReactDropdownNow, should render controlClassName', (t) => {
  const component = mount(
    <ReactDropdownNow
      controlClassName="control-class"
      options={[
        { value: 'item', label: 'item', className: 'item' },
        {
          type: 'group',
          name: 'group',
          items: [
            {
              value: 'group item',
              label: 'group item',
              className: 'group-item',
            },
          ],
        },
      ]}
    />,
  );

  t.true(component.exists('.Dropdown-root > .Dropdown-control.control-class'));
  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.exists('.Dropdown-root > .Dropdown-control.control-class'));
});

test('ReactDropdownNow, should render className', (t) => {
  const component = mount(
    <ReactDropdownNow
      className="root-class"
      options={[
        { value: 'item', label: 'item', className: 'item' },
        {
          type: 'group',
          name: 'group',
          items: [
            {
              value: 'group item',
              label: 'group item',
              className: 'group-item',
            },
          ],
        },
      ]}
    />,
  );

  t.true(component.exists('.Dropdown-root.root-class'));
  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.exists('.Dropdown-root.root-class'));
});

test('ReactDropdownNow, uses label property even when view is set', (t) => {
  const component = mount(
    <ReactDropdownNow
      className="root-class"
      options={[
        {
          label: 'label',
          value: 'value',
          view: <span className="tester">test</span>,
        },
        { value: 'item', label: 'item', className: 'item' },
        {
          type: 'group',
          name: 'group',
          items: [
            {
              value: 'group item',
              label: 'group item',
              className: 'group-item',
            },
          ],
        },
      ]}
    />,
  );

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });

  t.true(component.exists('.Dropdown-option .tester'));
  t.false(component.exists('.Dropdown-control .tester'));
});
