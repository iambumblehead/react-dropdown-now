import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Option } from '../Option';
import { castElement } from '../../../.jest/utils';
import { ITEM_TYPE } from '../../constants';

describe('Option', () => {
  it('renders a string option, selected', () => {
    const { getByText, getByRole } = render(
      <Option
        selected
        option={{
          id: 'one',
          index: 0,
          type: ITEM_TYPE.OPTION,
          option: {
            value: 'one',
            label: 'one',
          },
        }}
      />,
    );

    expect(getByText('one')).toBeInTheDocument();
    expect(getByRole('option').classList.contains('is-selected')).toBe(true);
  });

  it('renders an object option', () => {
    const { getByText, getByRole } = render(
      <Option
        option={{
          id: '',
          index: 0,
          type: ITEM_TYPE.OPTION,
          option: { label: 'label', value: 'value' },
        }}
      />,
    );

    expect(getByText('label')).toBeInTheDocument();
    expect(getByRole('option').classList.contains('is-selected')).toBe(false);
  });

  it('renders an object option, selected', () => {
    const { getByText, getByRole } = render(
      <Option
        selected
        option={{
          id: '',
          index: 0,
          type: ITEM_TYPE.OPTION,
          option: { label: 'label', value: 'value' },
        }}
      />,
    );

    expect(getByText('label')).toBeInTheDocument();
    expect(getByRole('option').classList.contains('is-selected')).toBe(true);
  });

  it('renders label with ReactNode', () => {
    const { getByText, getByRole } = render(
      <Option
        option={{
          id: '',
          index: 0,
          type: ITEM_TYPE.OPTION,
          option: {
            label: <span className="test-label">label</span>,
            value: 'value',
          },
        }}
        selected
      />,
    );

    const option = getByRole('option');

    expect(getByText('label')).toBeInTheDocument();
    expect(option.classList.contains('is-selected')).toBe(true);
    expect(
      castElement(option.firstChild).classList.contains('test-label'),
    ).toBe(true);
  });

  it('emits onSelect event', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(
      <Option
        option={{
          id: '',
          index: 0,
          type: ITEM_TYPE.OPTION,
          option: {
            value: 'option',
            label: 'option',
          },
        }}
        onSelect={onSelect}
      />,
    );

    const option = getByRole('option');

    fireEvent.mouseDown(option);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({}),
      expect.objectContaining({
        option: {
          value: 'option',
          label: 'option',
        },
      }),
    );
  });

  it('uses view property when set', () => {
    const { getByText } = render(
      <Option
        option={{
          id: '',
          index: 0,
          type: ITEM_TYPE.OPTION,
          option: {
            label: 'label',
            value: 'value',
            view: <span className="tester">test</span>,
          },
        }}
      />,
    );

    expect(getByText('test')).toBeInTheDocument();
  });
});
