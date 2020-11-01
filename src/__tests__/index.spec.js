import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ReactDropdownNow from '..';
import { queryByAttr } from '../../.jest/utils';

describe('Dropdown', () => {
  it('should have classnames closed', () => {
    const onOpen = jest.fn();
    const { container, unmount } = render(
      <ReactDropdownNow
        options={['one', 'two', 'three']}
        onOpen={onOpen}
        value="one"
      />,
    );

    expect(container.innerHTML).toBe(
     `<div data-testid="dropdown-root" class="rdn">
        <div data-testid="dropdown-control" role="presentation" class="rdn-control">
          <div data-testid="dropdown-placeholder" class="rdn-control-placeholder is-selected">one</div>
          <div data-testid="dropdown-arrow" class="rdn-control-arrow">
            <span class="rdn-control-arrow-icon"></span>
          </div>
        </div>
      </div>`.replace(/(\/n|\s*)(?=<)/gi, ''),
    );

    unmount();
  });

  it('should have classnames disabled', () => {
    const onOpen = jest.fn();
    const { getByTestId, container, unmount } = render(
      <ReactDropdownNow
        options={['one', 'two', 'three']}
        disabled
        onOpen={onOpen}
        value="one"
      />,
    );

    const dropdownControl = getByTestId('dropdown-control');

    fireEvent.mouseDown(dropdownControl);

    expect(container.innerHTML).toBe(
     `<div data-testid="dropdown-root" class="rdn is-disabled">
        <div data-testid="dropdown-control" role="presentation" class="rdn-control is-disabled">
          <div data-testid="dropdown-placeholder" class="rdn-control-placeholder is-selected is-disabled">one</div>
          <div data-testid="dropdown-arrow" class="rdn-control-arrow is-disabled">
            <span class="rdn-control-arrow-icon is-disabled"></span>
          </div>
        </div>
      </div>`.replace(/(\/n|\s*)(?=<)/gi, ''),
    );

    unmount();
  });

  test('should have classnames opened', () => {
    const onOpen = jest.fn();
    const { getByTestId, container, unmount } = render(
      <ReactDropdownNow
        options={[
          'one',
          'two',
          'three',
          {
            name: 'group1',
            items: [
              { value: 'four', label: 'Four', className: 'myOptionClassName' },
              { value: 'five', label: 'Five' },
            ],
          },
        ]}
        onOpen={onOpen}
        value="one"
      />,
    );

    const dropdownControl = getByTestId('dropdown-control');

    fireEvent.mouseDown(dropdownControl);

    expect(container.innerHTML).toBe(
      `<div data-testid="dropdown-root" class="rdn is-open">
        <div data-testid="dropdown-control" role="presentation" class="rdn-control is-open">
          <div data-testid="dropdown-placeholder" class="rdn-control-placeholder is-selected is-open">one</div>
          <div data-testid="dropdown-arrow" class="rdn-control-arrow is-open">
          <span class="rdn-control-arrow-icon is-open"></span>
        </div>
      </div>
      <div data-testid="dropdown-menu" class="rdn-drop is-open" aria-expanded="true">
        <div data-testid="dropdown-option" class="rdn-drop-menu-option is-selected" role="option" aria-selected="true" tabindex="0">one</div>
        <div data-testid="dropdown-option" class="rdn-drop-menu-option" role="option" aria-selected="false" tabindex="1">two</div>
        <div data-testid="dropdown-option" class="rdn-drop-menu-option" role="option" aria-selected="false" tabindex="2">three</div>
        <div class="rdn-drop-menu-group" role="listbox" tabindex="-1">
          <div class="rdn-drop-menu-group-title">group1</div>
          <div data-testid="dropdown-option" class="myOptionClassName rdn-drop-menu-group-option" role="option" aria-selected="false" tabindex="3">Four</div>
          <div data-testid="dropdown-option" class="rdn-drop-menu-group-option" role="option" aria-selected="false" tabindex="4">Five</div>
        </div>
      </div>
     </div>`.replace(/(\/n|\s*)(?=<)/gi, ''),
    );

    unmount();
  });

  it('should open dropdown', () => {
    const onOpen = jest.fn();
    const { unmount, getByTestId } = render(
      <ReactDropdownNow
        options={['one', 'two', 'three']}
        onOpen={onOpen}
        value="one"
      />,
    );

    const dropdownControl = getByTestId('dropdown-control');
    const dropdownRoot = getByTestId('dropdown-root');

    fireEvent.mouseDown(dropdownControl);

    expect(onOpen).toHaveBeenCalled();
    expect(dropdownRoot.classList.contains('is-open')).toBe(true);

    unmount();
  });

  it('should call onChange', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const onChange = jest.fn();
    const { unmount, getByTestId, getAllByTestId } = render(
      <ReactDropdownNow
        options={['one', 'two', 'three']}
        value="one"
        onOpen={onOpen}
        onClose={onClose}
        onChange={onChange}
      />,
    );

    const dropdownControl = getByTestId('dropdown-control');
    const dropdownRoot = getByTestId('dropdown-root');

    fireEvent.mouseDown(dropdownControl);

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(dropdownRoot.classList.contains('is-open')).toBe(true);

    const dropdownOptions = getAllByTestId('dropdown-option');
    fireEvent.mouseDown(dropdownOptions[2]);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    unmount();
  });

  it('should use and update the selected value state', () => {
    const onOpen = jest.fn();
    const { getAllByTestId, getByTestId, unmount, container } = render(
      <ReactDropdownNow
        options={['one', 'two', 'three']}
        onOpen={onOpen}
        value="one"
      />,
    );

    const dropdownControl = getByTestId('dropdown-control');
    const dropdownRoot = getByTestId('dropdown-root');

    fireEvent.mouseDown(dropdownControl);

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(dropdownRoot.classList.contains('is-open')).toBe(true);
    expect(queryByAttr('aria-selected')(container, 'true').textContent).toBe(
      'one',
    );

    const dropdownOptions = getAllByTestId('dropdown-option');
    fireEvent.mouseDown(dropdownOptions[2]);

    fireEvent.mouseDown(dropdownControl);
    expect(queryByAttr('aria-selected')(container, 'true').textContent).toBe(
      'three',
    );

    unmount();
  });

  it('should render same open shut arrow class', () => {
    const { getByTestId } = render(
      <ReactDropdownNow options={['one', 'two', 'three']} value="one" />,
    );

    const dropdownControl = getByTestId('dropdown-control');
    expect(getByTestId('dropdown-arrow')).toBeInTheDocument();
    fireEvent.mouseDown(dropdownControl);
    expect(getByTestId('dropdown-arrow')).toBeInTheDocument();
  });

  test('should render custom open shut arrow elems', () => {
    const arrowClosedElem = <span className="arrow-closed" />;
    const arrowOpenedElem = <span className="arrow-opened" />;
    const { getByTestId } = render(
      <ReactDropdownNow
        options={['one', 'two', 'three']}
        value="one"
        arrowClosed={arrowClosedElem}
        arrowOpen={arrowOpenedElem}
      />,
    );

    const dropdownControl = getByTestId('dropdown-control');

    expect(
      getByTestId('dropdown-arrow').firstChild.classList.contains(
        'arrow-closed',
      ),
    ).toBe(true);
    fireEvent.mouseDown(dropdownControl);
    expect(
      getByTestId('dropdown-arrow').firstChild.classList.contains(
        'arrow-opened',
      ),
    ).toBe(true);
  });

  test('should render custom option classNames', () => {
    const { getByTestId, getAllByTestId } = render(
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

    const dropdownControl = getByTestId('dropdown-control');
    fireEvent.mouseDown(dropdownControl);

    const dropdownOptions = getAllByTestId('dropdown-option');

    expect(dropdownOptions.some((x) => x.classList.contains('item'))).toBe(
      true,
    );
    expect(
      dropdownOptions.some((x) => x.classList.contains('group-item')),
    ).toBe(true);
  });

  it('should render with className attribue', () => {
    const { getByTestId, queryByTestId } = render(
      <ReactDropdownNow
        className="menu-class"
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

    const dropdownControl = getByTestId('dropdown-control');
    expect(queryByTestId('dropdown-menu')).not.toBeInTheDocument();
    fireEvent.mouseDown(dropdownControl);
    expect(getByTestId('dropdown-menu')).toBeInTheDocument();
    expect(
      getByTestId('dropdown-placeholder').classList.contains('menu-class'),
    ).toBe(true);
  });

  test('should render className', () => {
    const { getByTestId } = render(
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

    const dropdownControl = getByTestId('dropdown-control');

    expect(getByTestId('dropdown-root').classList.contains('root-class')).toBe(
      true,
    );
    fireEvent.mouseDown(dropdownControl);
    expect(getByTestId('dropdown-root').classList.contains('root-class')).toBe(
      true,
    );
  });

  it('should use label property even when view is set', () => {
    const { getByTestId, getAllByTestId } = render(
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

    const dropdownControl = getByTestId('dropdown-control');

    fireEvent.mouseDown(dropdownControl);

    const dropdownOptions = getAllByTestId('dropdown-option');

    expect(dropdownControl.classList.contains('tester')).toBe(false);

    expect(dropdownOptions[0].firstChild.classList.contains('tester')).toBe(
      true,
    );
  });

  it('should match selected when object option passed to value prop', () => {
    const { getByTestId } = render(
      <ReactDropdownNow
        value={{ value: 'item 1' }}
        options={[
          {
            value: 'item 1',
            label: 'label with item 1',
            className: 'item',
          },
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

    expect(getByTestId('dropdown-placeholder').textContent).toBe(
      'label with item 1',
    );
  });

    it('should match selected value to top level id with custom matcher', () => {
      const {getByTestId} = render(
        <ReactDropdownNow
          value="custom-id"
          matcher={(item, val) => {
            // item => { id, option: {id, value, label} }
            return item.id === val;
          }}
          options={[
            {
              id: 'custom-id',
              value: 'item',
              label: 'item with custom id',
              className: 'item',
            },
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


    expect(getByTestId('dropdown-placeholder').textContent).toBe(
        'item with custom id',
      );
    });

    it('should match selected value (inside a group) to top level id with custom matcher', () => {
      const {getByTestId} = render(
        <ReactDropdownNow
          value="custom-id-2"
          matcher={(item, val) => {
            // item => { id, option: {id, value, label} }
            return item.id === val;
          }}
          options={[
            {
              id: 'custom-id',
              value: 'item',
              label: 'item with custom id',
              className: 'item',
            },
            {
              type: 'group',
              name: 'group',
              items: [
                {
                  id: 'custom-id-2',
                  value: 'group item',
                  label: 'label with custom-id-2',
                  className: 'group-item',
                },
              ],
            },
          ]}
        />,
      );

      expect(getByTestId('dropdown-placeholder').textContent).toBe(
        'label with custom-id-2',
      );

    });

    it('should clear dropdown value', () => {
      const onOpen = jest.fn();
      const { unmount, getByTestId, rerender } = render(
        <ReactDropdownNow
          options={['one', 'two', 'three']}
          onOpen={onOpen}
          value="one"
        />);

      rerender(
        <ReactDropdownNow
          options={['one', 'two', 'three']}
          onOpen={onOpen}
          value={undefined}
        />);

      expect(
        getByTestId('dropdown-placeholder').innerHTML
      ).toBe( 'Select...' );

      unmount();
    });
});
