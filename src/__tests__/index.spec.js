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
      `<div data-testid="dropdown-root" class="Dropdown-root">
         <div role="presentation" data-testid="dropdown-control" class="Dropdown-control">
           <div data-testid="dropdown-placeholder" class="Dropdown-placeholder is-selected">one</div>
           <div data-testid="dropdown-arrow" class="Dropdown-arrow-wrapper">
             <span class="Dropdown-arrow"></span>
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
      `<div data-testid="dropdown-root" class="Dropdown-root is-open">
           <div role="presentation" data-testid="dropdown-control" class="Dropdown-control">
             <div data-testid="dropdown-placeholder" class="Dropdown-placeholder is-selected">one</div>
             <div data-testid="dropdown-arrow" class="Dropdown-arrow-wrapper">
               <span class="Dropdown-arrow"></span>
             </div>
           </div>
           <div data-testid="dropdown-menu" class="Dropdown-menu" aria-expanded="true">
             <div data-testid="dropdown-option" class="Dropdown-option is-selected" role="option" aria-selected="true" tabindex="0">one</div>
             <div data-testid="dropdown-option" class="Dropdown-option" role="option" aria-selected="false" tabindex="1">two</div>
             <div data-testid="dropdown-option" class="Dropdown-option" role="option" aria-selected="false" tabindex="2">three</div>
             <div class="Dropdown-group" role="listbox" tabindex="-1">
               <div class="Dropdown-title">group1</div>
               <div data-testid="dropdown-option" class="myOptionClassName Dropdown-option" role="option" aria-selected="false" tabindex="3">Four</div>
               <div data-testid="dropdown-option" class="Dropdown-option" role="option" aria-selected="false" tabindex="4">Five</div>
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

  it('should render custom open shut arrow classNames', () => {
    const { getByTestId } = render(
      <ReactDropdownNow
        options={['one', 'two', 'three']}
        value="one"
        arrowClassName="arrow-class"
      />,
    );

    const dropdownControl = getByTestId('dropdown-control');

    expect(
      getByTestId('dropdown-arrow').firstChild.classList.contains(
        'arrow-class',
      ),
    ).toBe(true);
    fireEvent.mouseDown(dropdownControl);
    expect(
      getByTestId('dropdown-arrow').firstChild.classList.contains(
        'arrow-class',
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

  it('should render menuClassName', () => {
    const { getByTestId, queryByTestId } = render(
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

    const dropdownControl = getByTestId('dropdown-control');
    expect(queryByTestId('dropdown-menu')).not.toBeInTheDocument();
    fireEvent.mouseDown(dropdownControl);
    expect(getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('should render placeholderClassName', () => {
    const { getByTestId, getAllByTestId } = render(
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

    const dropdownControl = getByTestId('dropdown-control');

    expect(getByTestId('dropdown-placeholder')).toBeInTheDocument();
    fireEvent.mouseDown(dropdownControl);

    const dropdownOptions = getAllByTestId('dropdown-option');

    fireEvent.mouseDown(dropdownOptions[1]);

    expect(
      getByTestId('dropdown-placeholder').classList.contains('is-selected'),
    ).toBe(true);
  });

  it('should render controlClassName', () => {
    const { getByTestId } = render(
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

    const dropdownControl = getByTestId('dropdown-control');

    expect(
      getByTestId('dropdown-control').classList.contains('control-class'),
    ).toBe(true);
    fireEvent.mouseDown(dropdownControl);
    expect(
      getByTestId('dropdown-control').classList.contains('control-class'),
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
});
