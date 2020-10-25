import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Selection from '../src/Selection';

test('Selection, classnames closed', (t) => {
  const onOpen = sinon.spy();
  const component = mount(
    <Selection
      options={['one', 'two', 'three']}
      onOpen={onOpen}
      value="one"
    />,
  );

  t.is(
    component.html(),
    `<div class="rdn-selection">
       <div class="rdn-selection-menu-option is-selected" role="option" aria-selected="true" tabindex="0">one</div>
       <div class="rdn-selection-menu-option" role="option" aria-selected="false" tabindex="1">two</div>
       <div class="rdn-selection-menu-option" role="option" aria-selected="false" tabindex="2">three</div>
     </div>`
      .replace(/(\/n|\s*)(?=<)/gi, '')
  );

  component.unmount();
});
