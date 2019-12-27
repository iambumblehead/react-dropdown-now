import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import ReactDropdownNow from '../index';

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

  t.true(/class="Dropdown-root is-open"/.test(component.html()));
  component.unmount();
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
  t.false(/class="Dropdown-root is-open"/.test(component.html()));
  component.unmount();
});
