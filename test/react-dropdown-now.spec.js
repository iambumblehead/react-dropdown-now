import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import ReactDropdownNow from '../src';

test('ReactDropdownNow, opens', t => {
  const onOpen = sinon.spy();
  const component = mount(
    <ReactDropdownNow
      options={['one', 'two', 'three']}
      onOpen={onOpen}
      value={'one'}
    />,
  );

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.find('.Dropdown-root').hasClass('is-open'));
  t.true(onOpen.calledOnce);
  component.unmount();
});

test('ReactDropdownNow, calls onChange', t => {
  const onOpen = sinon.spy();
  const onClose = sinon.spy();
  const onChange = sinon.spy();
  const component = mount(
    <ReactDropdownNow
      options={['one', 'two', 'three']}
      value={'one'}
      onOpen={onOpen}
      onClose={onClose}
      onChange={onChange}
    />,
  );

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });

  component
    .find('.Dropdown-option')
    .at(0)
    .simulate('mousedown', { button: 0 });

  t.true(onOpen.calledOnce);
  t.true(onChange.calledOnce);
  t.true(onClose.calledOnce);
  t.false(component.find('.Dropdown-root').hasClass('is-open'));
  component.unmount();
});

test.only('ReactDropdownNow, uses and updates the selected value state', t => {
  const onOpen = sinon.spy();
  const component = mount(
    <ReactDropdownNow
      options={['one', 'two', 'three']}
      onOpen={onOpen}
      value={'one'}
    />,
  );

  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.is(component.find('.Dropdown-option.is-selected').text(), 'one');
  t.true(component.find('.Dropdown-root').hasClass('is-open'));
  component.find('.Dropdown-option').at(2).simulate('mousedown', { button: 0 });
  component.find('.Dropdown-control').simulate('mousedown', { button: 0 });
  t.true(component.find('.Dropdown-root').hasClass('is-open'));
  t.is(component.find('.Dropdown-option.is-selected').text(), 'two');

  component.unmount();
});
