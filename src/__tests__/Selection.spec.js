import React from 'react';
import { render } from '@testing-library/react';

import { Selection } from '..';

describe('Selection', () => {
  it('should have selection classnames closed', () => {
    const onOpen = jest.fn();
    const { container, unmount } = render(
      <Selection
        options={['one', 'two', 'three']}
        onOpen={onOpen}
        value="one"
      />,
    );

    expect(container.innerHTML).toBe(
      `<div class="rdn-selection">
        <div data-testid="dropdown-option" class="rdn-selection-menu-option is-selected" role="option" aria-selected="true" tabindex="0">one</div>
        <div data-testid="dropdown-option" class="rdn-selection-menu-option" role="option" aria-selected="false" tabindex="1">two</div>
        <div data-testid="dropdown-option" class="rdn-selection-menu-option" role="option" aria-selected="false" tabindex="2">three</div>
      </div>`.replace(/(\/n|\s*)(?=<)/gi, ''),
    );

    unmount();
  });
});
