import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Option from '../src/components/Option';

test('ReactDropdownNow.option, renders a string option, selected', (t) => {
  const component = mount(
    <Option
      selected="one"
      option={{
        id: 'one',
        option: {
          value: 'one',
          label: 'one',
        },
      }}
    />,
  );

  t.is(component.text(), 'one');
  t.true(component.find('.Dropdown-option').hasClass('is-selected'));
});

test('ReactDropdownNow.option, renders an object option', (t) => {
  const component = mount(
    <Option option={{ option: { label: 'label', value: 'value' } }} />,
  );

  t.is(component.find('.Dropdown-option').text(), 'label');
  t.false(component.find('.Dropdown-option').hasClass('is-selected'));
});

test('ReactDropdownNow.option, renders an object option, selected', (t) => {
  const component = mount(
    <Option
      option={{ option: { label: 'label', value: 'value' } }}
      selected="value"
    />,
  );

  t.is(component.find('.Dropdown-option').text(), 'label');
  t.true(component.find('.Dropdown-option').hasClass('is-selected'));
});

test('ReactDropdownNow.option, emits onSelect event', (t) => {
  const onSelect = sinon.spy();
  const component = mount(
    <Option
      option={{
        option: {
          value: 'option',
          label: 'option',
        },
      }}
      onSelect={onSelect}
    />,
  );

  component.find('.Dropdown-option').simulate('mousedown', { button: 0 });

  t.true(onSelect.calledOnce);

  const [event, selected] = onSelect.args[0];

  t.is(event.type, 'mousedown');
  t.is(selected.option.value, 'option');
  t.is(selected.option.label, 'option');
});

test('ReactDropdownNow.option, uses view property when set', (t) => {
  const component = mount(
    <Option
      option={{
        option: {
          label: 'label',
          value: 'value',
          view: <span className="tester">test</span>,
        },
      }}
    />,
  );

  t.is(component.find('.Dropdown-option').text(), 'test');
});
