import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';

import ReactDropdownNow from '../index';

test('ReactDropdownNow, opens', t => {
  const component = mount(
    <ReactDropdownNow onClick={() => {}} />
  );

  t.true(/div/.test(component.html()));
});
