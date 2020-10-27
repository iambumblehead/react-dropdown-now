import React from 'react';
import get from 'lodash/get';
import '../../style.css';
import './assets/custom.css';

import Selection from '../Selection';

export default {
  title: 'Example/Selection',
  component: Selection,
  argTypes: {
    className: {
      control: { type: 'select', options: ['clear', 'my-custom-class'] },
    },
  },
};

const defaultMatcher = (item, option) => {
  const { value } = item.option;
  return value === option || value === get(option, 'value');
};

const Template = (args) => <Selection {...args} />;

export const SelectionExample = Template.bind({});

const options = [
  { value: 'one', label: 'One' },
  {
    value: 'two',
    label: 'Two',
  },
  {
    name: 'group1',
    items: [
      {
        value: 'three',
        label: 'Three',
      },
      { value: 'four', label: 'Four' },
    ],
  },
  {
    name: 'group2',
    items: [
      { value: 'five', label: 'Five' },
      { value: 'six', label: 'Six' },
    ],
  },
];

SelectionExample.args = {
  options,
  onChange: (option) => {
    console.log('You selected ', option.label);
  },
  matcher: defaultMatcher,
  onClose: () => undefined,
  onOpen: () => undefined,
  className: '',
};
