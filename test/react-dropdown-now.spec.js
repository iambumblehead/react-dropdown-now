import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import ReactDropdownNow, { Option } from '../index';

test('ReactDropdownNow.option, renders a string option', t => {
  const component = mount(
    <Option option={'one'} />
  );

  t.is(component.text(), 'one');
  t.false(component.find('.Dropdown-option').hasClass('is-selected'));
});

test('ReactDropdownNow.option, renders a string option, selected', t => {
  const component = mount(
    <Option option={'one'} selected={'one'} />
  );

  t.is(component.text(), 'one');
  t.true(component.find('.Dropdown-option').hasClass('is-selected'));
});

test('ReactDropdownNow.option, renders an object option', t => {
  const component = mount(
    <Option option={{ label: 'label', value: 'value' }} />
  );

  t.is(component.find('.Dropdown-option').text(), 'label');
  t.false(component.find('.Dropdown-option').hasClass('is-selected'));
});

test('ReactDropdownNow.option, renders an object option, selected', t => {
  const component = mount(
    <Option option={{ label: 'label', value: 'value' }} selected={'value'} />
  );

  t.is(component.find('.Dropdown-option').text(), 'label');
  t.true(component.find('.Dropdown-option').hasClass('is-selected'));
});

test('ReactDropdownNow.option, emits onSelect event', t => {
  const onSelect = sinon.spy();
  const component = mount(
    <Option option={'option'} onSelect={onSelect} />
  );

  component
    .find('.Dropdown-option')
    .simulate('mousedown', { button: 0 });

  t.true(onSelect.calledOnce);

  const [ event, value, label ] = onSelect.args[0];

  t.is(event.type, 'mousedown');
  t.is(value, 'option');
  t.is(label, 'option');
});

test('ReactDropdownNow, opens', t => {
  const component = mount(
    <ReactDropdownNow
      options={[ 'one', 'two', 'three' ]}
      value={'one'}
    />
  );

  component
    .find('.Dropdown-control')
    .simulate('mousedown', { button: 0 });

  t.true(component.find('.Dropdown-root').hasClass('is-open'));
});

test('ReactDropdownNow, calls onChange', t => {
  const onChange = sinon.spy();
  const component = mount(
    <ReactDropdownNow
      options={[ 'one', 'two', 'three' ]}
      value={'one'}
      onChange={onChange}
    />
  );

  component
    .find('.Dropdown-control')
    .simulate('mousedown', { button: 0 });

  component
    .find('.Dropdown-option')
    .at(0)
    .simulate('mousedown', { button: 0 });

  t.true(onChange.calledOnce);
  t.false(component.find('.Dropdown-root').hasClass('is-open'));
});
